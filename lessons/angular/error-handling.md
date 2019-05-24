# Angular Error Handling
You can see a full example of this in context in the full-stack login-reg section, but here's a quickie for reference. When we use `.subscribe()` for an http call we usually just use one callback function. However, we have the option to use _two callbacks_: one that handles a successful response, and one that handles an error response. Let's look at some code in isolation from the login-reg section.

users.service.ts
```javascript
createUser(userData: object): void {
  let obs = this.http.post<object>(`${this.baseUrl}/create/`, userData);
  obs.subscribe(
    (data) => {
      localStorage.setItem('user_id', data.id);
    },
    (errors) => {
      console.log(errors);
    }
  )
}
```
This looks like it's all happening on separate lines (it is), but what you might not notice at first glance is that the function starting with `(data)` and the function starting with `(errors)` are both _inside_ the parameter list of the `.subscribe()` function. Notice the comma after the `}` that ends the `(data)` function. These are just two separate callback functions that are being passed as two separate arguments.

##### Who cares?
This is useful when you expect the server to respond with a status code that indicates there was an error (400-599). This allows us to gracefully handle those cases where the server doesn't work and give the user a heads-up without having to refresh the page. Neat!