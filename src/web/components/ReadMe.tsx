import '../style/ReadMe.css'

export default function ReadMe() {
  return (
    <div>
      <h2>Siteline Interview Project</h2>
      <p>
        Welcome to your Siteline take-home interview project! If you've made it this far, hopefully
        that means you've got the project up and running. Good work :)
      </p>
      <h4>So what's this all about?</h4>
      <p>
        First, a little background. As you may know, Siteline is a platform that helps trade
        contractors streamline their billing workflows. Each month, our customers generate an
        invoice for each of their projects, and submit that invoice to the project's general
        contractor. For them to get paid, it's critical that the invoice is compiled accurately and
        on time.
      </p>
      <p>
        Your task is to build a simple app for managing those monthly invoices. A version of
        Siteline, at its (absolute) most basic. For simplicity's sake, we'll call this product{' '}
        <b>Invoicely</b> (although you're welcome to rename it if you're feeling entrepreneurial).
      </p>
      <h4>The details</h4>
      <p>
        Project invoices are, fundamentally, just lists of tasks completed or materials purchased in
        a month. For example, a mechanical contractor might submit a July invoice with two line
        items—say, "Labor" for $8,000 and "Equipment" for $6,500.
      </p>
      <p>
        Your app should help users manage these simple invoices. Specifically, we're looking for the
        following features:
      </p>
      <ul>
        <li>Viewing a list of your invoices</li>
        <li>
          Creating a new project's invoice, with a title (e.g. <i>SFO Terminal 1</i>)
        </li>
        <li>Adding new line items to an invoice, including a description and dollar amount</li>
        <li>Editing and removing existing line items on an invoice</li>
        <li>Saving an invoice</li>
      </ul>
      <p>
        <i>Note:</i> We've provided everything we think you should need on the backend, and the
        start to a simple API for you to use on the frontend for querying and editing data (see{' '}
        <i>web/api.ts</i>). For the tasks above, you shouldn't need to edit or directly invoke any
        of the functions within the <i>api</i> directory (but you will need to extend the frontend
        API in <i>web/api.ts</i>).
      </p>
      <h4>What you'll be evaluated on</h4>
      <ul>
        <li>
          <b>Functionality:</b> The app should work as expected. A user can view, create, and edit
          invoices without error. Any bonus features are welcome, but the list above should be fully
          implemented.
        </li>
        <li>
          <b>Coding style:</b> The implementation is clean, consistent, and appropriately
          documented. You've made idiomatic coding choices and follow web development best
          practices.
        </li>
        <li>
          <b>UX:</b> The website is friendly and intuitive to use, and you've made good design and
          layout decisions. We're not expecting professional-grade visual design, but do want to see
          a neat, modern interface.
        </li>
      </ul>
      <h4>Getting started</h4>
      <p>
        At this point, you should already have the app running on localhost. From here, we'd suggest
        you start with the <i>Projects.tsx</i> component, which includes routes, and the{' '}
        <i>ProjectList.tsx</i> component, which has a very basic start to a homepage. You are
        welcome (and will likely want) to change or scrap anything provided, but may find it useful
        to see an example of how to call an API function and add new routes. The rest is up to you!
        Feel free to ask questions along the way, happy to help if you get stuck or need any
        guidance. But this is also intentionally open-ended, and we're excited to see what direction
        you take it!
      </p>
      <p>Good luck, and happy invoicing.</p>
    </div>
  )
}
