
# Billing App
A basic app for creating and updating invoices


### Roadmap

Here are a few features top of mind that have not yet implemented / addressed.

- [ ] Form validation and input sanitization
- [ ] Graceful error handling on failing api calls
- [ ] Overflow on list panels so that long lists can scroll and not break the layout
- [ ] Loading pages, loading indicators, success indicators (toasts etc.) error states
- [ ] Empty states for lists
- [ ] No option to delete projects or edit them
- [ ] Responsiveness in general
- [ ] Testing in general
- [ ] Accessibility in general - labels, descriptive text, hover text, html hierarchy etc.
- [ ] Optimizing icons / images
- [ ] Further extraction of theming variables (like spacing)
- [ ] Caching? Memoization? Look into performance improvements
- [ ] Error handling when id from url not in db
- [ ] 404 page would be nice
- [ ] Url redirecting might not be best practice. Requires investigation
- [ ] Header bar with profile information etc.
- [ ] Filtering/ searching / sorting of invoices and projects

### High Level Project Structure:

To provide some insight into how I broke down this project. Any component prefixed with 'Style-' was my attempt at extracting out some basic shared styles and functionality that I could see being reused.

Here's the basic structure (smaller components excluded):

- App

  - Theme
  - Sidebar

- HomePage

  - ProjectsPanel
    - ProjectList
      - ItemCard
  - NewProjectPanel
    - NewProjectForm
      - StyledForm

- InvoicePage

  - InvoicePanel
    - LineItemList
      - ItemCard
  - StyledDetailPanel (wraps EditLineItemForm)

  - EditLineItemForm
    - LineItemForm
    - StyledForm
  - StyledDetailPanel (wraps NewLineItemForm)

  - NewLineItemForm
    - LineItemForm
    - StyledForm

### Sources

- Icons: https://robbiepearce.com/softies/
- Design Inspiration: https://dribbble.com/shots/18334433-Homeowner-Invoice
- CSS Reset: https://www.joshwcomeau.com/css/custom-css-reset/
