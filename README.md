# Siteline take-home technical challenge

### Roadmap

Here are a few features and bugs top of mind that have not yet implemented / addressed.

If you'd like to see or discuss solutions to any of these issues, please let me know:

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
- [ ] Form validation and error handling
- [ ] 404 page would be nice
- [ ] Url redirecting might not be best practice. Requires investigation
- [ ] Header bar with profile information etc.
- [ ] Filtering/ searching / sorting of invoices and projects

### High Level Project Structure:
To provide some insight into how I broke down this project. Any component prefixed with 'Style-' was my attempt at extracting out some basic shared styles and functionality that I could see being reused. 

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



### Done differently?

- As a personal preference I would have probably stuck to plain css and custom props for theming instead of styled-components. I do like the easy theming, encapsulated styles, and being able to use component props to set styles dynamically, but I'm not a huge fan of how it furthur pollutes the template. 
- The way that I broke down the forms into separate is not as intuitive as I'd like, and I believe can be improved. I wanted to extract shared features and styles to reduce duplication, but that comes with the cost of some added complexity.

### Sources

- Icons: https://robbiepearce.com/softies/
- Design Inspiration: https://dribbble.com/shots/18334433-Homeowner-Invoice
- CSS Reset: https://www.joshwcomeau.com/css/custom-css-reset/
