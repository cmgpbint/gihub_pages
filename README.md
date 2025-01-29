# Embed Rich HTML in Markdown Using SVG

GitHub Markdown allows the embedding of SVG images, and you can use the `<foreignObject>` element to include rich HTML, such as tables or interactive elements, inside an SVG. Below is an example of embedding an interactive filterable table inside an SVG element.

### Example: Filterable Table with HTML and SVG

```svg
<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg">
  <foreignObject x="0" y="0" width="500" height="400">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f4f4f4;
          }
          .filter {
            margin-bottom: 10px;
          }
          .filter label {
            margin-right: 10px;
          }
          .filter input[type="checkbox"] {
            margin-right: 5px;
          }
          .hidden {
            display: none;
          }

          /* Filtering based on checkbox states */
          input[type="checkbox"]:not(:checked) ~ table tr.category1 {
            display: none;
          }
          input[type="checkbox"]:not(:checked) ~ table tr.category2 {
            display: none;
          }
        </style>
      </head>
      <body>
        <h1>Filterable Table with HTML & CSS</h1>
        
        <!-- Filters (Checkboxes) -->
        <div class="filter">
            <label>
                <input type="checkbox" checked class="category1Filter"> Category 1
            </label>
            <label>
                <input type="checkbox" checked class="category2Filter"> Category 2
            </label>
        </div>

        <!-- Table -->
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr class="category1">
                    <td>Item A</td>
                    <td>Category 1</td>
                    <td>$10</td>
                </tr>
                <tr class="category2">
                    <td>Item B</td>
                    <td>Category 2</td>
                    <td>$15</td>
                </tr>
                <tr class="category1">
                    <td>Item C</td>
                    <td>Category 1</td>
                    <td>$12</td>
                </tr>
                <tr class="category2">
                    <td>Item D</td>
                    <td>Category 2</td>
                    <td>$20</td>
                </tr>
            </tbody>
        </table>
      </body>
    </html>
  </foreignObject>
</svg>
```