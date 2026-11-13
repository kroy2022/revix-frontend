---
name: revix-product-design
description: Design and implement Revix interfaces that feel modern, elegant, and focused for students (especially medical students). Uses a calm warm-neutral palette with green accents, strong typographic hierarchy, deliberate depth, accessible interactions, Tailwind CSS, and modular components built on shadcn/ui.
---

# Revix Product Design and Frontend Skill

## Purpose

Build Revix as a beautiful, modern, and dependable learning platform for students, particularly medical students.

Medical students study for long hours, handle dense material, and are often tired and short on time. The interface should reduce friction and mental load, keep attention on the material, and still feel polished and enjoyable to use.

Revix should feel calm, sharp, and confident. It should look designed, not assembled from defaults.

This skill defines platform-wide standards. Feature-specific requirements determine individual layouts and behavior.

## 1. Governing Principles

- The student's current task comes first. Content is the hero.
- Make the next action obvious.
- Keep screens uncluttered. Show what matters now, and reveal the rest when it is relevant.
- Keep common workflows simple and advanced functionality discoverable.
- Preserve context, user input, and progress.
- Use familiar interaction patterns.
- Every screen should have a clear focal point and a clear visual hierarchy.
- Beauty comes from proportion, typography, spacing, tone, and a few deliberate details. Use depth and polish with intent, not as decoration.
- Accessibility is part of implementation, not a finishing step.
- Reuse existing components before creating new ones, and restyle them through shared tokens so the product feels cohesive and custom.
- Do not invent product features, claims, or backend behavior.
- Do not remove explicit requirements for visual simplicity.

Revix should not feel childish, clinical, promotional, or busy. It should feel like a premium tool built by people who care.

## 2. Required Frontend Approach

### Default Stack

- React and TypeScript.
- Tailwind CSS for styling.
- shadcn/ui as the starting point for common UI primitives.
- Lucide icons, or the project's existing icon library.
- Existing project tools for forms, validation, data fetching, and state management.

Follow the repository's installed versions and conventions. Do not upgrade frameworks or add competing libraries without a clear requirement.

### Before Implementing

Inspect:

1. Existing design tokens and global styles.
2. Installed shadcn/ui components.
3. Shared components and layout primitives.
4. Existing form and validation patterns.
5. Routing, data-fetching, and state conventions.
6. Existing implementations of similar interactions.

Extend established patterns where they are good. If an existing pattern produces a flat or generic result, improve it through shared tokens and components rather than working around it one screen at a time.

## 3. Visual Identity

### Theme

Use light mode with warm-neutral backgrounds, white content surfaces, dark readable text, and green as the brand color.

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
| `primary-deep` | `#174F30` | Deep green for feature surfaces and hero panels |
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

- Keep the base interface neutral so content stands out, then use green with intent.
- Solid green is for primary actions and key moments. It may also fill a single feature surface (such as a hero panel, a progress summary, or a streak card) using `primary` or `primary-deep` with white text, as long as contrast is verified.
- Use light green for selected states, highlights, and gentle emphasis.
- Subtle tonal variation is encouraged: layered neutrals, green-tinted surfaces, and soft gradients between tokens on key surfaces (see Section 6).
- Categories or subjects may use a small, consistent set of muted tints when it helps students scan (for example, subjects or specialties). Define them as tokens, keep them low in saturation, and always pair color with a label or icon.
- Do not communicate meaning through color alone.
- Do not use lowered opacity for ordinary secondary text.
- Verify contrast in actual rendered states.
- Do not use decorative borders as the only way to identify controls.

Important: shadcn's `accent` represents a supporting or interactive surface. Use `primary` for the saturated brand green; do not confuse the two.

## 4. Tailwind and Theme Implementation

### Token Strategy

Define semantic colors centrally and expose them through the project's Tailwind theme.

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

Raw color values belong in the theme definition, not scattered throughout feature components. If a new tint, shadow, or gradient is needed more than once, add it to the theme.

### Version Compatibility

- For Tailwind v4, use the repository's CSS-first theme conventions.
- For Tailwind v3, extend the existing Tailwind configuration.
- Preserve the color format expected by the installed shadcn setup.
- Do not mix incompatible hex, HSL-channel, or OKLCH token conventions.
- Extend existing tokens rather than duplicating them under new names.

### Styling Rules

- Use Tailwind utilities for layout, spacing, typography, responsive behavior, and interaction states.
- Use the existing `cn` utility to compose conditional classes.
- Use the project's variant utility, such as CVA, for reusable variants.
- Keep repeated visual patterns in shared components.
- Use CSS for global tokens, typography rules, shadows, gradients, and genuinely complex styling.
- Use inline styles only for runtime values that cannot be represented cleanly with static utilities.
- Do not construct dynamic Tailwind class names that the build cannot detect.
- Use explicit variant maps for runtime styling.
- Avoid unnecessary arbitrary values and `!important`.

## 5. Typography

Typography is the main source of Revix's polish. Use it to create clear hierarchy, rhythm, and contrast.

### Font

Use:

    Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif

Use the existing font setup. Do not add a blocking dependency solely to obtain Inter. A single additional display or reading face is allowed if it loads without blocking rendering, is applied consistently, and is defined as a token.

### Scale

Use two registers.

**Workflow screens** (study sessions, forms, tables, settings, dense content):

| Role | Default |
|---|---|
| Page heading | `text-2xl`, optionally `md:text-3xl`, semibold, tight tracking |
| Section heading | `text-lg` or `text-xl`, semibold |
| Body | `text-base`, normal |
| Control label | `text-sm` or `text-base`, medium |
| Metadata | `text-sm`, muted |

**Expressive screens** (home, dashboard overview, onboarding, empty states, completion and milestone moments):

| Role | Default |
|---|---|
| Display heading | `text-3xl` to `text-5xl`, semibold, tight tracking (`tracking-tight`), relaxed leading |
| Key figures (scores, streaks, counts) | `text-4xl` to `text-6xl`, semibold, `tabular-nums` |
| Lead text | `text-lg` or `text-xl`, `text-secondary` |

### Rules

- Use sentence case.
- Use strong contrast in size and weight between headings, body, and metadata. Hierarchy should be readable at a glance.
- Use `tabular-nums` for scores, timers, percentages, and tables so numbers align.
- Keep body content readable, with comfortable line length (about 60 to 75 characters for long-form text).
- Keep large display type out of dense workflow screens.
- Use bold and uppercase sparingly. Small uppercase labels with letter spacing are acceptable for short section eyebrows.
- Do not shrink text to force it into fixed containers.
- Support long titles, medical terminology, technical notation, equations, lists, and tables.
- Preserve readability when users enlarge text.

## 6. Spacing, Geometry, Surfaces, and Depth

### Spacing

Use Tailwind's spacing scale consistently.

Preferred values:

    1, 2, 3, 4, 6, 8, 12, 16, 20, 24

Typical patterns:

- Icon and label: `gap-2`.
- Related controls: `gap-2` or `gap-3`.
- Content groups: `gap-4` or `gap-6`.
- Major sections: `gap-8` to `gap-12`.
- Page padding: `px-4 sm:px-6 lg:px-8`.

Be generous around the primary content and the focal point. Whitespace is the main tool for calm. Avoid cramped layouts, and also avoid scattering content so widely that students must scroll to see related information.

### Radius

Establish shared radius tokens:

- Controls: approximately 10px.
- Supporting surfaces: approximately 12px to 14px.
- Larger content surfaces and feature panels: approximately 16px to 20px.

Map these to the project's shared radius system. Do not use arbitrary radii independently throughout the app.

### Surfaces and Elevation

- Use a simple elevation system defined as tokens: flat (border only), raised (soft shadow), and overlay (stronger shadow for menus, dialogs, and sheets).
- Shadows should be soft, low-opacity, and tinted toward the foreground green-black, never pure black.
- Cards may use a hairline border plus a very soft shadow to feel lifted off the canvas.
- Feature surfaces (a daily summary, a progress panel, a hero) may use a subtle tonal gradient between neighboring tokens, such as `accent` to `card`, or `primary` to `primary-deep` with white text. Keep gradients soft and low in contrast, and use them on one or two surfaces per screen.
- Use containers when they express a meaningful grouping. Not every section needs a card. Let content sit directly on the canvas when it reads well.
- Avoid deeply nested surfaces.
- Do not make every control pill-shaped. Pills are fine for tags, filters, and badges.

## 7. Design Intent and Composition

Before building any screen, decide how it should feel and where the eye should go.

- **Focal point:** every screen has one thing that matters most (the current question, the next session, the main summary). Give it the most space, size, or contrast.
- **Hierarchy:** a student should understand the page by scanning headings, key figures, and the primary action.
- **Rhythm:** vary scale and density intentionally. Pair a large, calm area with a compact supporting area instead of repeating identical blocks.
- **Signature moments:** one or two per screen is enough. Examples include a strong greeting header, a large progress figure, a feature panel, a thoughtful empty state, a satisfying completion screen, or a clean illustration. Not every screen needs one.
- **Restraint:** show only what the student needs right now. Remove any element that does not help the current task.
- **Alignment and proportion:** use a consistent grid, align edges, and keep consistent gutters. Precision reads as quality.

For dense study content, such as flashcards, question banks, notes, and reference material, optimize for reading comfort and sustained focus first. Keep chrome minimal and quiet.

## 8. Component Architecture

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

Reuse installed components before adding others. Restyle them through shared tokens and variants so they look like Revix, not stock shadcn.

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
- StatCard.
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

Do not place an entire feature's rendering, data transformation, and interaction logic in one oversized page component.

### Extraction Rules

Extract a component when it:

- Is reused.
- Owns meaningful interaction or accessibility behavior.
- Has a distinct responsibility.
- Makes the parent substantially easier to understand.

Do not create abstractions solely to reduce a few lines of JSX.

Prefer explicit composition over large components controlled by many unrelated boolean props.

## 9. Using shadcn/ui

- Treat shadcn components as the shared foundation. Make them feel like Revix by adapting shared tokens first.
- Add reusable variants when the product needs consistent new treatments.
- Preserve keyboard interaction, focus management, and semantic behavior.
- Avoid copying a primitive into multiple feature folders to change its styling.
- Avoid wrapping every shadcn component with a redundant abstraction.
- Do not rebuild menus, dialogs, tooltips, or selects from scratch without a specific reason.

Use a dialog for a focused blocking task, a menu for actions, a tooltip for brief supporting information, and inline content for ordinary explanations.

Do not choose an overlay merely because it looks polished.

## 10. Interaction Hierarchy

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

## 11. Information and Progressive Disclosure

- Make each screen's purpose clear.
- Prioritize the current task.
- Group related information.
- Show commonly needed controls directly.
- Reveal advanced options and supplementary detail when relevant.
- Do not hide essential context or qualifications.
- Keep secondary functions discoverable through clear labels.
- Avoid unnecessary choices and interruptions.
- Summaries and key figures are welcome when they help students decide what to do next. Show the few metrics that matter, not every available metric.

Feature-specific requirements override generic preferences. If a feature requires content to remain visible, do not collapse it in the name of minimalism.

## 12. State and Data Responsibilities

- Distinguish server state from local interface state.
- Use the repository's existing data-fetching conventions.
- Keep temporary input local unless persistence is required.
- Lift state only as far as necessary.
- Do not introduce global state for every interaction.
- Preserve drafts and progress through ordinary UI changes.
- Avoid duplicate derived state.
- Prevent duplicate submissions.
- Represent asynchronous operations truthfully.
- Do not imply completion before the backend confirms it.

Separate complicated behavior into focused hooks or utilities when that improves clarity and testability.

## 13. Feedback, Errors, and Trust

- Give clear feedback after actions.
- Keep feedback near the relevant control or content.
- Explain errors in plain language.
- Preserve recoverable input.
- Provide a useful next step.
- Distinguish empty, loading, processing, and error states.
- Do not invent progress percentages.
- Do not claim validation, verification, or certainty that has not occurred.
- Distinguish generated, inferred, and user-provided information where relevant. This matters especially for medical content.
- Make important information inspectable and correctable.

Use notifications for transient confirmation, not as the only location for actionable errors.

Completion and progress moments may be warmly acknowledged (a clear success state, a clean summary, a meaningful figure). Keep the tone encouraging and factual.

## 14. Responsive Design

- Start with a usable narrow-screen layout. Many students study on phones and tablets.
- Expand intentionally at larger breakpoints.
- Reflow content rather than shrinking it.
- Allow text and controls to wrap naturally.
- Avoid horizontal page overflow.
- Provide intentional overflow for genuinely wide content such as tables.
- Do not rely on hover for essential functionality.
- Preserve user state when the layout changes.
- Do not introduce different business behavior solely because the viewport changes.

Choose widths and breakpoints based on content needs rather than forcing every page into one layout.

## 15. Accessibility

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
- Verify contrast on gradients and feature surfaces, including text placed over them.

Prefer a clear disabled-state explanation when users would otherwise not understand why an action is unavailable.

## 16. Motion

- Use motion to clarify state changes and to add polish.
- Prefer short transitions, approximately 120ms to 200ms, with gentle easing.
- Use targeted transition properties rather than `transition-all` by default.
- Subtle entrance transitions (a soft fade and small rise) are welcome on key surfaces and list items.
- Respect `prefers-reduced-motion`.
- Avoid bounce, glow, looping decoration, and dramatic transforms.
- Do not introduce artificial delays.
- Minimize layout shifts and unexpected scrolling.

## 17. Icons and Copy

### Icons

- Use the existing icon library consistently.
- Keep stroke style and sizing consistent.
- Use icons to support meaning, not replace essential labels.
- Icons may sit in soft tinted containers (for example, `bg-accent` with `text-accent-foreground`) to add structure to lists and cards.
- Give icon-only controls accessible names.
- Mark decorative icons as hidden from assistive technology.

### Copy

- Use clear, concise, specific language.
- Prefer action labels that explain the outcome.
- Avoid exaggerated claims and promotional language inside workflows.
- Avoid emojis unless explicitly requested.
- Explain unfamiliar concepts when needed.
- Keep the tone helpful, competent, and encouraging.

## 18. Avoid

- Neon accents, glowing borders, glassmorphism, and heavy blur effects.
- Loud, high-saturation gradients and rainbow palettes.
- Large saturated backgrounds that lack a functional reason or fail contrast checks.
- Arbitrary one-off colors for different features. Use defined tokens.
- Clutter: too many cards, badges, metrics, banners, or competing calls to action on one screen.
- Excessive nested cards.
- Faint text used to simulate elegance.
- Tiny or ambiguous controls.
- Decorative dashboards that expose every metric.
- Repeated interruptions and promotional banners.
- Unnecessary modal dialogs.
- Styling that bypasses shared tokens.
- Duplicate component systems.
- Premature abstractions and unnecessary dependencies.
- Unsupported claims presented with authoritative visual styling.
- Screens that look like a stack of identical default components with no focal point.

## 19. Implementation Workflow

For each UI task:

1. Understand the requested behavior and acceptance criteria.
2. Inspect existing components, tokens, and conventions.
3. **Write a short design intent** (two or three sentences): the screen's purpose, its focal point, and how it should feel for a student using it.
4. Identify the primary task and information hierarchy, and decide what can be left out.
5. Compose the interface from existing primitives, and choose where a signature moment (if any) belongs.
6. Add reusable components only where justified.
7. Style with semantic Tailwind utilities, tokens, and the shared elevation and radius systems.
8. Implement all relevant states and recovery paths.
9. Verify responsive behavior and accessibility.
10. Run available type checks, linting, and tests.
11. Review for visual quality, consistency, and unnecessary complexity.

Do not describe a feature as working if it is only a mock. Clearly distinguish prototype behavior from production integration.

## 20. Review Checklist

Before completing work, confirm:

**Clarity**
- Is the primary task obvious?
- Is there a clear focal point and visual hierarchy?
- Is the screen free of clutter, with only what the student needs right now?
- Are explicit requirements preserved?

**Craft**
- Does it look designed and polished, not like default components stacked together?
- Is typography doing the work of hierarchy, with clear contrast between heading, body, and metadata?
- Is spacing generous around the focal point and consistent elsewhere?
- Is depth (borders, shadows, subtle tonal surfaces) used deliberately and sparingly?
- Are colors, radii, and elevation consistent and drawn from tokens?

**Engineering**
- Are semantic Tailwind tokens used?
- Were existing shadcn and shared components reused and restyled through tokens?
- Are component responsibilities clear?
- Are loading, empty, error, and success states covered?
- Is user input preserved appropriately?
- Have unnecessary dependencies, abstractions, and decoration been avoided?

**Accessibility and responsiveness**
- Does the interface work with a keyboard and on mobile?
- Is contrast verified in rendered states, including over gradients?
- Are long and unexpected content, such as medical terms and wide tables, handled?

## End Goal

Revix should feel like one coherent, beautiful product: modern, elegant, and calm.

Students should spend their attention on learning, and enjoy the experience of doing it.