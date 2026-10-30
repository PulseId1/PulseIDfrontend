# PulseID — Design System & Visual Specification

## 1. Design Vision & Principles

The PulseID design system is engineered to convey **clinical precision, trust, accessibility, and modern elegance**. As a healthcare technology platform, readability, unambiguous visual hierarchy, and strict compliance with WCAG 2.1 AA accessibility standards are fundamental requirements.

---

## 2. Confirmed Requirements

1. **Styling Foundation:**
   - Tailwind CSS `v4.3.3` utilizing native CSS variables and `@theme inline` directive in `src/app/globals.css`.
   - Zero runtime CSS-in-JS libraries.
2. **Typography Integration:**
   - Next.js font optimization using `Geist` (primary sans-serif) and `Geist_Mono` (tabular data, code, IDs).
3. **Accessibility:**
   - Minimum 4.5:1 contrast ratio for normal text and 3:1 for large text across light and dark modes.
   - Visible keyboard focus rings (`focus-visible:ring-2`) on all interactive controls.
   - Screen-reader accessible markup with explicit ARIA attributes where semantic HTML is insufficient.
4. **Responsive Breakpoints:**
   - Mobile-first approach scaling through standard breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

---

## 3. Proposed Decisions

### Color Token Palette

The following token structure is proposed for clinical clarity:

| Token Name | Intended Role | Sample Value (Light) | Sample Value (Dark) |
| :--- | :--- | :--- | :--- |
| `primary` | Clinical brand / primary CTAs | `rgb(14 116 144)` (Cyan 700) | `rgb(34 211 238)` (Cyan 400) |
| `primary-hover` | Interactive hover state | `rgb(21 94 117)` (Cyan 800) | `rgb(103 232 249)` (Cyan 300) |
| `surface-bg` | Page background | `#ffffff` / `rgb(250 250 250)` | `#0a0a0a` / `rgb(18 18 18)` |
| `surface-card`| Elevated card container | `#ffffff` | `rgb(24 24 27)` |
| `text-primary`| Headings and high-contrast copy| `rgb(15 23 42)` (Slate 900) | `rgb(248 250 252)` (Slate 50) |
| `text-muted`  | Secondary details, captions | `rgb(100 116 139)` (Slate 500)| `rgb(148 163 184)` (Slate 400) |
| `border-subtle`| Dividers and card borders | `rgb(226 232 240)` (Slate 200)| `rgb(39 39 42)` (Zinc 800) |
| `status-success`| Positive validation / active Rx | `rgb(22 163 74)` (Green 600) | `rgb(74 222 128)` (Green 400) |
| `status-alert`  | Drug interaction warnings | `rgb(220 38 38)` (Red 600) | `rgb(248 113 113)` (Red 400) |
| `status-warning`| Pending verification / notice | `rgb(217 119 6)` (Amber 600) | `rgb(251 191 36)` (Amber 400) |

### UI Component Primitives (Phase 2 Roadmap)
- `Button`: Multiple variants (`primary`, `secondary`, `outline`, `ghost`) and sizes (`sm`, `md`, `lg`).
- `Badge`: Status badges for roles (Patient, Doctor, Pharmacist) and release countdown.
- `Card`: Clean bordered container with subtle elevation for feature spotlights.
- `Input`: Accessible text input with label and helper text for waitlist sign-up.

---

## 4. Open Questions

1. **Official Brand Logo & Monogram:**
   - Will an official SVG logo be supplied, or should an accessible typographic mark with clinical iconography be created?
2. **Iconography Standard:**
   - Which icon set is preferred for Phase 2 landing page (e.g., `lucide-react`, `@heroicons/react`, or custom SVGs)?
3. **Dark Mode Toggle:**
   - Should Phase 2 include an explicit theme toggle switch (via next-themes), or rely on system `prefers-color-scheme`?
