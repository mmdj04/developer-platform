import { cn } from "@/lib/utils"

function PageSection({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"section"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <section
      data-slot="page-section"
      data-orientation={orientation}
      className={cn(
        "group/page-section w-full",
        "data-[orientation=horizontal]:grid data-[orientation=horizontal]:grid-cols-1 data-[orientation=horizontal]:items-start data-[orientation=horizontal]:gap-6",
        "@5xl:data-[orientation=horizontal]:grid-cols-[1fr_2fr]",
        "@5xl:data-[orientation=horizontal]:[&>[data-slot=page-section-content]]:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function PageSectionMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-section-meta"
      className={cn(
        "sticky top-8 flex flex-col gap-3",
        "group-data-[orientation=horizontal]/page-section:mb-0 group-data-[orientation=horizontal]/page-section:max-w-md",
        className
      )}
      {...props}
    />
  )
}

function PageSectionSummary({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="page-section-summary" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

function PageSectionTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="page-section-title"
      className={cn("text-base font-medium leading-6 text-foreground", className)}
      {...props}
    />
  )
}

function PageSectionDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-section-description"
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
}

function PageSectionContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-section-content"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function PageSectionAside({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-section-aside"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  PageSection,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
  PageSectionDescription,
  PageSectionContent,
  PageSectionAside,
}
