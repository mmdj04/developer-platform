import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pageHeaderVariants = cva("group/page-header w-full flex flex-col gap-3 pb-8", {
  variants: {
    size: {
      small: "pb-4",
      default: "pb-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function PageHeader({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageHeaderVariants>) {
  return (
    <div
      data-slot="page-header"
      className={cn(pageHeaderVariants({ size }), className)}
      {...props}
    />
  )
}

function PageHeaderMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-meta"
      className={cn("flex flex-col gap-3 @5xl:flex-row @5xl:items-start @5xl:justify-between", className)}
      {...props}
    />
  )
}

function PageHeaderSummary({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="page-header-summary" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn("text-2xl font-semibold leading-8 text-foreground", className)}
      {...props}
    />
  )
}

function PageHeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-header-description"
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
}

function PageHeaderAside({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-aside"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  PageHeader,
  PageHeaderMeta,
  PageHeaderSummary,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderAside,
}
