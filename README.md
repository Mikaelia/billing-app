# Siteline take-home technical challenge!

## High Level Project Structure:

- _App_

  - Theme
  - Sidebar

- _HomePage_

  - ProjectsPanel
    - ProjectList
      - ItemCard
  - NewProjectPanel
    - NewProjectForm
      - StyledForm

- _InvoicePage_
  - InvoicePanel
    - LineItemList
      - ItemCard
  - StyledDetailPanel (wraps EditLineItemForm)
  - EditLineItemForm
    _ LineItemForm
    _ StyledForm
  - StyledDetailPanel (wraps NewLineItemForm)
  - NewLineItemForm
    _ LineItemForm
    _ StyledForm

## Roadmap

I can work on this until I'm dead I think. Here are a few features not yet implemented and edge case top of mind that have not been handled.
If you'd like to see solutions to any of these issues, please let me know:

- Add overflow on list panels so that long lists can scroll and not break the layout
- Adding loading pages, loading indicators, success indicators (toasts etc.) error states
- Empty states for lists
- No option to delete projects or edit them (their name)
- Responsiveness in general
- Testing in general
- Accessibility in general - labels, descriptive text, hover text, html hierarchy etc.
- Optimizing icons / images
- Further extraction of theming variables (like spacing)
- Caching? Memoization? Look into performance improvements, essentially
- Forms need a ton of validation
- 404 page would be nice
- Url redirecting might not be best practice. Would have to investigate
- Header bar with profile information etc
- Filtering/ searching / sorting of invoices and projects

### Done differently?

- Probably stuck to plain css and custom props for theming :) I'm not sure how I feel about "Styled-" components. I think it's an interesting idea to be able to create your own style components that you can import and wrap others to apply generic css, but also can see it getting out of hand.
- The way that I broke down the forms into separate is not as intuitive as I'd like, and I believe can be improved. I wanted to extract shared features and styles to reduce duplication, but that comes with the cost of some added complexity.

## Sources

- Icons: https://robbiepearce.com/softies/
- Design Inspiration: https://dribbble.com/shots/18334433-Homeowner-Invoice
- CSS Reset: https://www.joshwcomeau.com/css/custom-css-reset/
