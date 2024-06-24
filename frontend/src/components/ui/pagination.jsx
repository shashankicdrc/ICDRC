
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

// Pagination component
const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={`flex w-full ${className}`}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

// PaginationContent component
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={`flex flex-row items-center gap-1 ${className}`}
        {...props}
    />
));
PaginationContent.displayName = 'PaginationContent';

// PaginationItem component
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

// PaginationLink component
const PaginationLink = ({
    className,
    isActive,
    isDisabled,
    size = 'icon',
    children,
    ...props
}) => (
    <button
        aria-current={isActive ? 'page' : undefined}
        className={`
            ${isActive ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}
            h-10 w-10 px-2
            inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
            ring-offset-background transition-colors focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50
            ${className}
        `}
        disabled={isDisabled}
        {...props}
    >
        {children}
    </button>
);
PaginationLink.displayName = 'PaginationLink';

// PaginationPrevious component
const PaginationPrevious = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={`gap-1 pl-2.5 h-10 w-fit ${className}`}
        {...props}
    >
        <MdKeyboardArrowLeft className="h-5 w-5" />
        <span>Prev</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

// PaginationNext component
const PaginationNext = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={`gap-1 pr-2.5 h-10 w-fit ${className}`}
        {...props}
    >
        <span>Next</span>
        <MdKeyboardArrowRight className="h-5 w-5" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

// PaginationEllipsis component
const PaginationEllipsis = ({ className, ...props }) => (
    <span
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center ${className}`}
        {...props}
    >
        <IoEllipsisHorizontalSharp className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis
};

