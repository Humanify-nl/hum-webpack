# hum-webpack
Default webpack config for wordpress use.

Handles all the assets in a modern webpack 5 config for dev and prod

#### What it does:
- Bundle JS (babel env & jquery)
- Sass extraction
- Fonts, icons
- Index.html with everything in <head>
  
#### Files are ordered like so:
  
```
/src/ OR /dist/
-- assets /
  -- js/
    -- src/  <-- js files here
  -- css/
  -- scss/
  -- icons/
  -- images/
  -- fonts/
  index.html
```  

Notes: 
- You probably won't need index.html for wordpress, just enqueue the bundle.js, main.css & editor.css
- Jquery is assumed to be handled by wordpress itself, if not; add the script as per your preferences.
