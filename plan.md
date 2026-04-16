# Fix "Add Teacher" Button in Teacher Module

The user wants to make the "Add Teacher" button in the Teacher management module functional. Currently, the button exists but doesn't do anything.

## Proposed Changes:

### 1. State Management
- Convert the hardcoded `teachers` array into a React state using `useState`.
- Create a state for the "Add Teacher" form data (name, subject, classes, email, phone).
- Create a state to control the open/closed status of the "Add Teacher" dialog.

### 2. UI Components
- Implement a `Dialog` (modal) from `shadcn/ui` that opens when the "Add Teacher" button is clicked.
- Inside the dialog, create a form with fields for:
    - Full Name
    - Subject (e.g., Mathematics, Physics)
    - Classes Assigned (e.g., Grade 10, 11)
    - Email Address
    - Phone Number
- Use `Label` and `Input` components for the form fields.
- Use a "Save Teacher" button to submit the form.

### 3. Functional Logic
- Implement `handleAddTeacher` function to:
    - Validate that all fields are filled.
    - Create a new teacher object with a unique ID.
    - Add the new teacher to the `teachers` state list.
    - Show a success notification using `toast.success` from `sonner`.
    - Reset the form and close the dialog.

### 4. Styling & UX
- Maintain the existing `indigo-600` color theme.
- Ensure the dialog is responsive and looks good on mobile and desktop.
- Add subtle hover effects and transitions.

## Files to Modify:
- `src/components/TeacherModule.tsx`
