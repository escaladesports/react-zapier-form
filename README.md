# react-zapier-form

A React component for creating forms that post to Zapier's API. It posts directly to a [catch hook](https://zapier.com/apps/webhook/integrations), so you don't have to use another third party service to collect data from forms on your website.

- Honeypot to prevent spam
- Pass in your own form elements to render however you want
- Custom success/error messages & handlers
- Perfect for forms on static websites

## Installation

With npm:

```bash
npm install --save react-zapier-form
```

Or Yarn:

```bash
yarn add react-zapier-form
```

## Usage

A simple example with a small contact form:

```jsx
import ZapierForm from 'react-zapier-form'

...

<ZapierForm action='https://hooks.zapier.com/hooks/catch/2384321/kcli8e/'>
   {({ error, loading, success }) => {
      return (
         <div>
            {!success && !loading &&
               <div>
                  <input type='email' name='Email' placeholder='Email' />
                  <textarea name='Message' placeholder='Your message' />
                  <button>Submit</button>
               </div>
            }
            {loading && <div>Loading...</div>}
            {error && <div>Something went wrong. Please try again later.</div>}
            {success && <div>Thank you for contacting us!</div>}
         </div>
      )
   }}
</ZapierForm>
```

## Options

Prop | Description | Default
--- | --- | ---
canSubmit | Enable/disable form submission | `true`
honeyPotName | The name of your honeypot field | `"p_number"`
onSubmit | Call a function on every submission | None
onSuccess | Call a function on success | None
onError | Call a function on error | None
validate | Validate before form is submit to stop submission (async, return `true` or `false`) | None