# ISP Provisioning Platform Design Guidelines

## Design Approach: System-Based (Carbon Design System)

**Selected System**: IBM Carbon Design System - optimized for data-heavy enterprise applications with complex workflows and technical interfaces.

**Rationale**: ISP provisioning platforms require efficient data display, clear information hierarchy, and professional credibility. Carbon's focus on productivity and information density perfectly aligns with network management, billing systems, and technical monitoring interfaces.

## Typography System

**Font Stack**: IBM Plex Sans (primary), SF Mono (code/technical data)

- **Display Headers**: text-4xl font-semibold (Dashboard titles, page headers)
- **Section Headers**: text-2xl font-semibold (Card titles, major sections)
- **Subsection Headers**: text-lg font-medium (Table headers, widget titles)
- **Body Text**: text-base font-normal (Descriptions, table content)
- **Metadata/Labels**: text-sm font-medium (Form labels, status badges)
- **Technical Data**: text-sm font-mono (IP addresses, MAC addresses, bandwidth values)
- **Micro Text**: text-xs (Timestamps, helper text, chart labels)

## Layout System

**Spacing Scale**: Tailwind units of 1, 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4, p-6
- Section spacing: space-y-6, space-y-8
- Card spacing: gap-4, gap-6
- Page margins: px-6 py-8 (mobile), px-8 py-12 (desktop)

**Grid System**:
- Dashboard KPI cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Feature sections: grid-cols-1 lg:grid-cols-2
- Access point cards: grid-cols-1 md:grid-cols-2 xl:grid-cols-3
- Billing plans: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Container Strategy**:
- Sidebar navigation: Fixed width w-64, collapsible to w-16 on mobile
- Main content area: max-w-7xl mx-auto with px-6
- Full-width data tables: w-full with horizontal scroll on mobile
- Modal dialogs: max-w-2xl for forms, max-w-4xl for data-heavy modals

## Core Component Library

### Navigation & Layout

**Sidebar Navigation**:
- Fixed left sidebar with role-based menu items
- Collapsible groups for multi-level navigation
- Active state with border-l-4 accent indicator
- Icon + label pattern (icons from Heroicons)
- Sticky positioning with overflow-y-auto for long menus

**Top Header Bar**:
- h-16 fixed header with breadcrumb navigation
- Right-aligned utilities: search, notifications (badge count), theme toggle, user dropdown
- User dropdown shows: name, role badge, settings link, logout button

### Dashboard Components

**KPI Cards** (4-column grid on desktop):
- Card structure: rounded-lg border with p-6
- Icon container: w-12 h-12 rounded-lg with icon
- Metric value: text-3xl font-bold
- Label: text-sm with trend indicator (arrow + percentage)
- Trend visualization: Mini sparkline chart (optional)

**Chart Widgets**:
- Card wrapper with header (title + time period selector)
- Chart area: h-64 to h-80 depending on complexity
- Legend positioned bottom or right depending on chart type
- Use recharts library for bandwidth, revenue, activity graphs
- Include data point tooltips and axis labels

**Activity Feed**:
- List items with: avatar/icon, title, timestamp, status badge
- Alternating row emphasis with hover state
- "View all" link at bottom
- Limit to 5-8 recent items

### Data Tables

**Standard Table Pattern**:
- Sticky header row with sortable columns
- Row height: h-12 for compact, h-16 for comfortable viewing
- Alternating row background for scannability
- Hover state on entire row
- Action buttons: right-aligned icon buttons (edit, delete, more)
- Pagination: Bottom-aligned with page size selector

**Table Features**:
- Search bar: Top-left with icon, w-64 to w-80
- Filter dropdowns: Aligned right of search
- Bulk actions: Checkbox column with "Select all", action bar appears when items selected
- Export button: Top-right (CSV, PDF options)
- Empty state: Centered message with illustration and CTA

### Forms & Inputs

**Form Layout**:
- Two-column layout on desktop (grid-cols-2 gap-6)
- Full-width on mobile (grid-cols-1)
- Required field indicators: asterisk in label
- Field groups with subtle dividers (border-t mt-8 pt-8)

**Input Components**:
- Text fields: h-10 with px-3, rounded-md border
- Select dropdowns: Custom styled with chevron icon
- Multi-select: Tag-based with remove buttons
- Date pickers: Calendar popup with range selection
- Toggle switches: For boolean settings
- Radio groups: For plan selection, payment methods

**Form Actions**:
- Bottom-right alignment: gap-3 flex justify-end
- Primary button: solid with px-6 py-2
- Secondary button: outline variant
- Cancel: text variant

### Status & Feedback

**Status Badges**:
- Pill-shaped: rounded-full px-3 py-1 text-xs font-medium
- Semantic states: Active, Suspended, Pending, Offline, Paid, Overdue
- With dot indicator: w-2 h-2 rounded-full inline-block

**Alert Banners**:
- Full-width at page top or section top
- p-4 rounded-md with leading icon
- Dismissible with close button
- Types: Info, Success, Warning, Error

**Loading States**:
- Skeleton loaders for tables and cards
- Spinner for button actions
- Progress bars for uploads/downloads

### Modals & Overlays

**Modal Dialogs**:
- Backdrop: Semi-transparent overlay
- Container: Centered, max-w-2xl, rounded-lg with p-6
- Header: flex justify-between with title and close button
- Content: max-h-96 overflow-y-auto
- Footer: Sticky bottom with action buttons

**Confirmation Dialogs**:
- Smaller max-w-md
- Icon (warning/question) with centered text
- Destructive action emphasized in visual treatment

### Specialized Components

**Access Point Cards**:
- Border card with p-6
- Header: AP name + status indicator (online/offline pulse dot)
- Grid layout for metrics: 2 columns on mobile, 4 on desktop
- Metrics: Connected users, uptime %, signal strength, bandwidth usage
- Action buttons: Details (primary), Restart, Update firmware
- Visual indicator: Signal strength icon/bars

**Billing Plan Cards**:
- Highlighted card for featured/recommended plan (border-2)
- Vertical layout: Plan name, price (text-4xl), billing period
- Feature list: checkmarks with text-sm
- CTA button: Full-width at bottom
- Plan comparison: Side-by-side grid with feature matrix

**Ticket Cards**:
- Compact list item: flex layout
- Left: Priority badge (High/Medium/Low)
- Center: Ticket title, customer name, timestamp
- Right: Status badge, assigned agent avatar
- Click to expand for full details

## Page-Specific Layouts

### Login Page
- Centered card: max-w-md on gradient background
- Logo at top
- Form fields stacked vertically
- "Remember me" checkbox + "Forgot password" link
- Full-width submit button
- Development bypass: Small link at bottom (only dev mode)

### Dashboard
- 4-column KPI cards at top
- 2-column grid below: Chart widgets (left 2/3) + Activity feed (right 1/3)
- Quick actions panel: Recent transactions table below

### User Management
- Page header with "Add User" button
- Search + filters bar
- Data table with columns: Name, Email, Plan, Status, Connected Devices, Last Seen, Actions
- Pagination controls
- Side drawer for user details/edit (slides from right)

### Access Points
- Summary stats bar: Total APs, Online, Offline, Avg Uptime
- Filter bar: Status, Location, Firmware version
- Card grid (3 columns desktop)
- Detail modal with tabs: Overview, Connected Users, Settings, Logs

### Billing
- Tab navigation: Plans, Transactions, Invoices
- Plans tab: 3-column plan cards + "Add Plan" button
- Transactions: Revenue summary cards + searchable table
- Export functionality prominent

### Reports
- Date range selector: Prominent at top
- Chart grid: 2x2 on desktop (Revenue trend, User activity, Bandwidth, Payment methods)
- Summary statistics cards below charts
- Export buttons: PDF, CSV, Excel

### Support
- Two-column layout: Ticket list (left 2/5) + Detail view (right 3/5)
- New ticket button: Top-right
- Ticket list: Filterable by status, priority, agent
- Detail view: Thread/timeline layout with message composer at bottom
- Notification panel: Separate section for bulk notifications

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px - Single column, collapsible sidebar becomes drawer
- Tablet: 768px - 1024px - 2-column layouts, sidebar visible
- Desktop: > 1024px - Full multi-column grids, expanded sidebar

**Mobile Optimizations**:
- Bottom navigation for key actions
- Swipe gestures for sidebar
- Stacked cards instead of grids
- Horizontal scroll for wide tables
- Simplified charts (fewer data points)
- Floating action button for primary actions

## Images

**No hero images** - This is a functional admin dashboard, not a marketing site. All visual elements are data-driven: charts, graphs, status indicators, and iconography.

**Icon Usage**:
- Heroicons throughout for consistency
- 20x20 for inline icons
- 24x24 for standalone icons
- 48x48 for empty states