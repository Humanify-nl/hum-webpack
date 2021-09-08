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
