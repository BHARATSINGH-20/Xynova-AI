Design a modern AI chat web application called “XYNOVA” inspired by ChatGPT.

The design must support both Light Mode and Dark Mode with a toggle switch.

Tech Goal:
This UI will be implemented in React (Vite) using JSX (no TypeScript).
It must be structured in reusable components.
Tailwind CSS friendly layout.
Responsive and production-ready.

Overall Design Style:
- Clean, minimal, SaaS-level UI
- Plenty of whitespace
- Soft rounded corners (12px)
- Subtle shadows
- Professional typography (Inter or similar)
- Clear hierarchy
- No heavy gradients
- Elegant and readable

------------------------------------
LIGHT MODE DESIGN
------------------------------------
Background: #ffffff or #f9fafb
Borders: #e5e7eb
Primary text: #111827
Secondary text: #6b7280
Accent color: subtle emerald or soft blue

------------------------------------
DARK MODE DESIGN
------------------------------------
Background: #0f172a or #111827
Surface: #1f2937
Borders: #374151
Primary text: #f9fafb
Secondary text: #9ca3af
Accent color: soft cyan or blue glow

------------------------------------
Layout Structure
------------------------------------

1) Left Sidebar
- Width ~260px
- Logo: “XYNOVA”
- “+ New Chat” primary button
- Scrollable chat history
- Hover highlight effect
- Settings icon at bottom
- Collapsible on mobile

2) Top Header
- Model selector dropdown
- Clear chat button
- Dark/Light toggle switch (icon-based sun/moon)
- Profile avatar circle
- Minimal bottom divider

3) Main Chat Area
- Centered content column
- Max width 800–900px
- AI messages: left aligned
- User messages: right aligned
- Rounded message bubbles
- Code block styling
- Proper vertical spacing
- Auto-scroll area

4) Bottom Chat Input (Sticky)
- Rounded input field
- Placeholder: “Message XYNOVA…”
- Send button
- Subtle shadow
- Focus border animation
- Smooth hover effects

------------------------------------
UX Requirements
------------------------------------
- Smooth 200ms transitions
- Dark/Light toggle with smooth theme transition
- Typing indicator animation (three dots)
- Scrollbar styling minimal
- Fully responsive:
  - Desktop (1440px)
  - Tablet (768px)
  - Mobile (375px)

------------------------------------
Component Structure (Important)
------------------------------------
- Sidebar.jsx
- Header.jsx
- ChatContainer.jsx
- MessageBubble.jsx
- ChatInput.jsx
- ThemeToggle.jsx

Design must look like a real SaaS product.
Minimal.
Elegant.
Professional.
ChatGPT-level experience.