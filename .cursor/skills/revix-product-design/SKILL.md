---
name: revix-product-design
description: Design and implement Revix interfaces using a calm, warm-neutral visual identity, restrained green accents, accessible interactions, Tailwind CSS, and modular reusable components built on shadcn/ui.
---

# Revix Product Design and Frontend Skill

## Purpose

Build Revix as a cohesive, elegant, and dependable learning platform.

The interface should make complex learning workflows approachable without overwhelming users or hiding necessary functionality.

Make the product attractive through typography, spacing, hierarchy, and consistency—not decoration.

This skill defines platform-wide standards. Feature-specific requirements determine individual layouts and behavior.

## 1. Governing Principles

- Content and the user’s current task take priority.
- Make the next action obvious.
- Keep common workflows simple and advanced functionality discoverable.
- Preserve context, user input, and progress.
- Use familiar interaction patterns.
- Prefer a small, consistent visual vocabulary.
- Accessibility is part of implementation, not a finishing step.
- Reuse existing components before creating new ones.
- Do not remove explicit requirements for visual simplicity.
- Do not invent product features, claims, or backend behavior.

Revix should feel calm, precise, approachable, and capable—not childish, clinical, promotional, or visually busy.

## 2. Required Frontend Approach

### Default Stack

- React and TypeScript.
- Tailwind CSS for styling.
- shadcn/ui as the starting point for common UI primitives.
- Lucide icons, or the project’s existing icon library.
- Existing project tools for forms, validation, data fetching, and state management.

Follow the repository’s installed versions and conventions. Do not upgrade frameworks or add competing libraries without a clear requirement.

### Before Implementing

Inspect:

1. Existing design tokens and global styles.
2. Installed shadcn/ui components.
3. Shared components and layout primitives.
4. Existing form and validation patterns.
5. Routing, data-fetching, and state conventions.
6. Existing implementations of similar interactions.

Extend established patterns instead of building parallel systems.

## 3. Visual Identity

### Theme

Use light mode with warm-neutral backgrounds, white content surfaces, dark readable text, and restrained green accents.

Do not introduce dark mode or alternate themes unless requested. If the repository already supports them, preserve that support.

### Core Colors

| Semantic token | Value | Purpose |
|---|---|---|
| `background` | `#F8FAF7` | Application canvas |
| `foreground` | `#17231B` | Primary text |
| `card` | `#FFFFFF` | Content surfaces |
| `card-foreground` | `#17231B` | Content text |
| `popover` | `#FFFFFF` | Menus and overlays |
| `popover-foreground` | `#17231B` | Overlay text |
| `primary` | `#237A49` | Main actions |
| `primary-foreground` | `#FFFFFF` | Text on solid green |
| `secondary` | `#F3F6F2` | Secondary surfaces |
| `secondary-foreground` | `#4F5F53` | Secondary control text |
| `muted` | `#EDF1EC` | Subdued surfaces |
| `muted-foreground` | `#657168` | Metadata and supporting text |
| `accent` | `#EAF5EC` | Light-green emphasis |
| `accent-foreground` | `#1E633B` | Text on light green |
| `border` | `#E1E7DF` | Subtle boundaries |
| `input` | `#7F8D81` | Identifiable control boundaries |
| `ring` | `#237A49` | Keyboard focus |

### Extended Tokens

| Token | Value | Purpose |
|---|---|---|
| `primary-hover` | `#1C633B` | Solid-green hover |
| `primary-pressed` | `#174F30` | Solid-green pressed state |
| `accent-hover` | `#DDEFE1` | Tinted-green hover |
| `accent-border` | `#B8D9BF` | Tinted-green boundaries |
| `text-secondary` | `#4F5F53` | Supporting text |

### Semantic States

| State | Text / Icon | Background | Border |
|---|---|---|---|
| Error | `#A33434` | `#FCEEEE` | `#EAC3C3` |
| Warning | `#825619` | `#FBF3E5` | `#E6D1AB` |
| Success | `#1E633B` | `#EAF5EC` | `#B8D9BF` |
| Information | `#315E83` | `#EDF4FA` | `#C4D8E9` |

### Color Rules

- Keep most of the interface neutral.
- Reserve solid green for primary emphasis.
- Use light green for gentle emphasis and selected states.
- Do not give every feature or category a separate color.
- Do not communicate meaning through color alone.
- Do not use lowered opacity for ordinary secondary text.
- Verify contrast in actual rendered states.
- Do not use decorative borders as the only way to identify controls.

Important: shadcn’s `accent` represents a supporting or interactive surface. Use `primary` for the saturated brand green; do not confuse the two.

## 4. Tailwind and Theme Implementation

### Token Strategy

Define semantic colors centrally and expose them through the project’s Tailwind theme.

Use semantic utilities:

    bg-background
    text-foreground
    bg-card
    text-muted-foreground
    border-border
    bg-primary
    text-primary-foreground
    bg-accent
    text-accent-foreground
    ring-ring

Avoid component-level raw colors:

    bg-[#237A49]
    text-[#17231B]

Raw color values belong in the theme definition, not scattered throughout feature components.

### Version Compatibility

- For Tailwind v4, use the repository’s CSS-first theme conventions.
- For Tailwind v3, extend the existing Tailwind configuration.
- Preserve the color format expected by the installed shadcn setup.
- Do not mix incompatible hex, HSL-channel, or OKLCH token conventions.
- Extend existing tokens rather than duplicating them under new names.

### Styling Rules

- Use Tailwind utilities for layout, spacing, typography, responsive behavior, and interaction states.
- Use the existing `cn` utility to compose conditional classes.
- Use the project’s variant utility, such as CVA, for reusable variants.
- Keep repeated visual patterns in shared components.
- Use CSS for global tokens, typography rules, and genuinely complex styling.
- Use inline styles only for runtime values that cannot be represented cleanly with static utilities.
- Do not construct dynamic Tailwind class names that the build cannot detect.
- Use explicit variant maps for runtime styling.
- Avoid unnecessary arbitrary values and `!important`.

## 5. Typography

### Font

Use:

    Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif

Use the existing font setup. Do not add a blocking dependency solely to obtain Inter.

### Default Scale

| Role | Default |
|---|---|
| Page heading | `text-2xl`, optionally `md:text-3xl`, semibold |
| Section heading | `text-lg` or `text-xl`, semibold |
| Body | `text-base`, normal |
| Control label | `text-sm` or `text-base`, medium |
| Metadata | `text-sm`, muted |

### Rules

- Use sentence case.
- Keep body content readable.
- Use size, weight, spacing, and placement to establish hierarchy.
- Avoid oversized marketing headings inside product workflows.
- Use bold and uppercase sparingly.
- Do not shrink text to force it into fixed containers.
- Support long titles, technical notation, equations, lists, and tables.
- Preserve readability when users enlarge text.

## 6. Spacing, Geometry, and Surfaces

### Spacing

Use Tailwind’s spacing scale consistently.

Preferred values:

    1, 2, 3, 4, 6, 8, 12, 16

Typical patterns:

- Icon and label: `gap-2`.
- Related controls: `gap-2` or `gap-3`.
- Content groups: `gap-4` or `gap-6`.
- Major sections: `gap-8`.
- Page padding: `px-4 sm:px-6 lg:px-8`.

Use spacing to communicate relationships. Avoid both cramped interfaces and unnecessary scrolling caused by excessive whitespace.

### Radius

Establish shared radius tokens:

- Controls: approximately 10px.
- Supporting surfaces: approximately 12px.
- Larger content surfaces: approximately 16px.

Map these to the project’s shared radius system. Do not use arbitrary radii independently throughout the app.

### Surfaces

- Prefer subtle borders and restrained elevation.
- Do not wrap every section in a card.
- Use containers when they express a meaningful grouping.
- Avoid deeply nested surfaces.
- Reserve stronger elevation for actual overlays.
- Do not make every control pill-shaped.

## 7. Component Architecture

### Layer 1: UI Primitives

Use shadcn/ui for generic interface building blocks, including:

- Button.
- Input and Textarea.
- Label.
- Select and Checkbox.
- Tabs.
- Dialog and Alert Dialog.
- Dropdown Menu and Popover.
- Tooltip.
- Accordion and Collapsible.
- Separator.
- Skeleton.
- Sheet.
- Table.

Reuse installed components before adding others.

Keep primitives free of Revix-specific business logic.

### Layer 2: Shared Product Patterns

Create reusable components when the same product-level pattern appears repeatedly.

Examples:

- PageHeader.
- EmptyState.
- ErrorState.
- LoadingState.
- SearchField.
- FileUploader.
- StatusBadge.
- ConfirmActionDialog.
- SectionHeader.
- AsyncActionButton.

Use these names as examples, not a requirement to create every component upfront.

### Layer 3: Feature Components

Feature components compose primitives and shared patterns with domain-specific behavior.

Keep related feature code together. Avoid placing every component in one global folder.

### Layer 4: Pages

Pages orchestrate:

- Layout.
- Data loading.
- Routing.
- Feature composition.
- Page-level state.

Do not place an entire feature’s rendering, data transformation, and interaction logic in one oversized page component.

### Extraction Rules

Extract a component when it:

- Is reused.
- Owns meaningful interaction or accessibility behavior.
- Has a distinct responsibility.
- Makes the parent substantially easier to understand.

Do not create abstractions solely to reduce a few lines of JSX.

Prefer explicit composition over large components controlled by many unrelated boolean props.

## 8. Using shadcn/ui

- Treat shadcn components as the shared foundation, not a competing visual theme.
- Adapt shared tokens first.
- Add reusable variants when the product needs consistent new treatments.
- Preserve keyboard interaction, focus management, and semantic behavior.
- Avoid copying a primitive into multiple feature folders to change its styling.
- Avoid wrapping every shadcn component with a redundant abstraction.
- Do not rebuild menus, dialogs, tooltips, or selects from scratch without a specific reason.

Use a dialog for a focused blocking task, a menu for actions, a tooltip for brief supporting information, and inline content for ordinary explanations.

Do not choose an overlay merely because it looks polished.

## 9. Interaction Hierarchy

### Primary Actions

- Use solid primary green.
- Make the dominant action clear within its local context.
- Avoid several equally prominent actions competing together.

### Secondary Actions

- Use neutral or outlined treatments.
- Keep labels clear and controls discoverable.

### Quiet Actions

- Use restrained ghost or text treatments.
- Keep important functionality visible without requiring hover.

### Required States

Implement relevant states:

- Default.
- Hover.
- Focus-visible.
- Pressed.
- Selected.
- Expanded.
- Disabled.
- Loading.
- Error.
- Success.

Do not treat a temporary color change as sufficient feedback for a completed operation.

## 10. Information and Progressive Disclosure

- Make each screen’s purpose clear.
- Prioritize the current task.
- Group related information.
- Show commonly needed controls directly.
- Reveal advanced options and supplementary detail when relevant.
- Do not hide essential context or qualifications.
- Keep secondary functions discoverable through clear labels.
- Avoid unnecessary choices and interruptions.

Feature-specific requirements override generic preferences. If a feature requires content to remain visible, do not collapse it in the name of minimalism.

## 11. State and Data Responsibilities

- Distinguish server state from local interface state.
- Use the repository’s existing data-fetching conventions.
- Keep temporary input local unless persistence is required.
- Lift state only as far as necessary.
- Do not introduce global state for every interaction.
- Preserve drafts and progress through ordinary UI changes.
- Avoid duplicate derived state.
- Prevent duplicate submissions.
- Represent asynchronous operations truthfully.
- Do not imply completion before the backend confirms it.

Separate complicated behavior into focused hooks or utilities when that improves clarity and testability.

## 12. Feedback, Errors, and Trust

- Give clear feedback after actions.
- Keep feedback near the relevant control or content.
- Explain errors in plain language.
- Preserve recoverable input.
- Provide a useful next step.
- Distinguish empty, loading, processing, and error states.
- Do not invent progress percentages.
- Do not claim validation, verification, or certainty that has not occurred.
- Distinguish generated, inferred, and user-provided information where relevant.
- Make important information inspectable and correctable.

Use notifications for transient confirmation, not as the only location for actionable errors.

## 13. Responsive Design

- Start with a usable narrow-screen layout.
- Expand intentionally at larger breakpoints.
- Reflow content rather than shrinking it.
- Allow text and controls to wrap naturally.
- Avoid horizontal page overflow.
- Provide intentional overflow for genuinely wide content.
- Do not rely on hover for essential functionality.
- Preserve user state when the layout changes.
- Do not introduce different business behavior solely because the viewport changes.

Choose widths and breakpoints based on content needs rather than forcing every page into one layout.

## 14. Accessibility

- Use semantic elements and accessible names.
- Provide persistent labels for form inputs.
- Associate descriptions and errors with their controls.
- Support keyboard operation.
- Use visible focus indicators.
- Preserve the accessibility behavior of shared primitives.
- Provide alternatives to drag-only interactions.
- Do not rely on color, icons, or gestures alone.
- Keep frequently used controls comfortably sized.
- Support zoom, text enlargement, and reduced motion.
- Manage focus appropriately when interfaces change.
- Do not trap focus outside true modal interactions.

Prefer a clear disabled-state explanation when users would otherwise not understand why an action is unavailable.

## 15. Motion

- Use motion to clarify state changes.
- Prefer short transitions, approximately 120–180ms.
- Use targeted transition properties rather than `transition-all` by default.
- Respect `prefers-reduced-motion`.
- Avoid bounce, glow, looping decoration, and dramatic transforms.
- Do not introduce artificial delays.
- Minimize layout shifts and unexpected scrolling.

## 16. Icons and Copy

### Icons

- Use the existing icon library consistently.
- Keep stroke style and sizing consistent.
- Use icons to support meaning, not replace essential labels.
- Give icon-only controls accessible names.
- Mark decorative icons as hidden from assistive technology.

### Copy

- Use clear, concise, specific language.
- Prefer action labels that explain the outcome.
- Avoid exaggerated claims and promotional language inside workflows.
- Avoid emojis unless explicitly requested.
- Explain unfamiliar concepts when needed.
- Keep the tone helpful and competent.

## 17. Avoid

- Gradients, glassmorphism, neon accents, and glowing borders.
- Large saturated backgrounds without a functional reason.
- Arbitrary colors for different features.
- Excessive nested cards.
- Faint text used to simulate elegance.
- Tiny or ambiguous controls.
- Decorative dashboards exposing every metric.
- Repeated interruptions and promotional banners.
- Unnecessary modal dialogs.
- One-off styling that bypasses shared tokens.
- Duplicate component systems.
- Premature abstractions and unnecessary dependencies.
- Unsupported claims presented with authoritative visual styling.

## 18. Implementation Workflow

For each UI task:

1. Understand the requested behavior and acceptance criteria.
2. Inspect existing components, tokens, and conventions.
3. Identify the primary task and information hierarchy.
4. Compose the interface from existing primitives.
5. Add reusable components only where justified.
6. Style with semantic Tailwind utilities.
7. Implement all relevant states and recovery paths.
8. Verify responsive behavior and accessibility.
9. Run available type checks, linting, and tests.
10. Review for visual consistency and unnecessary complexity.

Do not describe a feature as working if it is only a mock. Clearly distinguish prototype behavior from production integration.

## 19. Review Checklist

Before completing work, confirm:

- Is the primary task obvious?
- Are explicit requirements preserved?
- Is the interface calm without hiding necessary information?
- Are colors, typography, spacing, and radii consistent?
- Are semantic Tailwind tokens used?
- Were existing shadcn and shared components reused?
- Are component responsibilities clear?
- Are loading, empty, error, and success states covered?
- Is user input preserved appropriately?
- Does the interface work with a keyboard and on mobile?
- Are long and unexpected content handled?
- Have unnecessary dependencies, abstractions, and decoration been avoided?

## End Goal

Revix should feel like one coherent product—not a collection of independently designed screens.

Users should spend their attention on learning, not on understanding the interface.