# Filterable Table with HTML & CSS

This repository contains an example of a filterable table that uses only **HTML** and **CSS**, with no JavaScript involved. The table allows users to filter rows based on categories by toggling checkboxes. This is a simple approach to demonstrate basic filtering functionality using just HTML and CSS.

## Demo

You can view the filterable table below, which allows toggling between two categories: **Category 1** and **Category 2**.

## How It Works

1. **HTML Structure**:
    - The table has rows assigned to different categories (`category1` and `category2`).
    - Checkboxes are used to filter the table, with each checkbox controlling the visibility of a category.

2. **CSS for Filtering**:
    - The `input[type="checkbox"]:not(:checked)` pseudo-class is used to hide the table rows based on the state of the checkboxes.
    - When a checkbox is unchecked, the corresponding category rows are hidden. When the checkbox is checked, the rows become visible again.

## Table with Filters (HTML & CSS)

The table is styled and controlled using only HTML and CSS. The CSS uses the `:not(:checked)` selector to hide or show rows depending on whether the checkbox is checked.

### Full Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filterable Table with Only HTML & CSS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
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
```