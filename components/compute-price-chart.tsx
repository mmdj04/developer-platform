"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Datum {
  label: string;
  price: number;
}

export function ComputePriceChart({ data }: { data: Datum[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const container = containerRef.current;
    const { width } = container.getBoundingClientRect();
    const height = 320;
    const margin = { top: 24, right: 100, bottom: 40, left: 64 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price) ?? 0])
      .range([0, innerWidth]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerHeight])
      .padding(0.25);

    const color = d3
      .scaleSequential(d3.interpolateRgbBasis(["#3ecf8e", "#2ea875"]))
      .domain([0, data.length - 1]);

    g.selectAll("g.bar")
      .data(data)
      .join("g")
      .attr("class", "bar")
      .attr("transform", (d) => `translate(0,${y(d.label) ?? 0})`)
      .call((bar) => {
        bar
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", (d) => x(d.price))
          .attr("height", y.bandwidth())
          .attr("fill", (_, i) => color(i))
          .attr("rx", 4)
          .attr("ry", 4);

        bar
          .append("text")
          .attr("x", (d) => x(d.price) + 8)
          .attr("y", y.bandwidth() / 2)
          .attr("dy", "0.35em")
          .attr("fill", "currentColor")
          .attr("class", "text-scale-11")
          .style("font-size", "13px")
          .style("font-family", "ui-monospace, monospace")
          .text((d) => `R$ ${d.price.toLocaleString("pt-BR")}`);
      });

    g.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .attr("color", "var(--color-scale-6)")
      .style("font-size", "12px")
      .style("font-family", "ui-monospace, monospace")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "0.03em");

    const xAxis = g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat((d) => `R$ ${d3.format("~s")(d)}`)
      )
      .attr("color", "var(--color-scale-6)")
      .style("font-size", "11px")
      .style("font-family", "ui-monospace, monospace");

    const handleResize = () => {
      const { width: newWidth } = container.getBoundingClientRect();
      if (newWidth !== width) {
        const newInner = newWidth - margin.left - margin.right;
        x.range([0, newInner]);
        svg.attr("width", newWidth);

        svg.selectAll<SVGGElement, Datum>("g.bar").each(function (d) {
          const g = d3.select(this);
          g.select("rect").attr("width", Math.max(0, x(d.price)));
          g.select("text").attr("x", x(d.price) + 8);
        });

        xAxis.call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat((d) => `R$ ${d3.format("~s")(d)}`)
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} className="overflow-visible" />
    </div>
  );
}
