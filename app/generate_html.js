// File: app/generate_html.js

const fs = require('fs');
const path = require('path');

// Define paths relative to the current script directory
const dataPath = path.join(__dirname, '..', 'data.json');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const imageSvgPath = path.join(__dirname, '..', 'image.svg');

// Load the JSON data
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Define the stages
const stages = {
  "dev": "Development",
  "hf": "Hotfix",
  "sit": "System Integration Testing",
  "stg": "Staging",
  "uat": "User Acceptance Testing"
};

// Begin HTML content
let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Proxy Deployment Status</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Custom CSS -->
    <style>
        body { background-color: #f8f9fa; }
        .not-deployed { color: red; font-weight: bold; }
        .table th, .table td { text-align: center; vertical-align: middle; }
        .proxy-header { background: white; font-weight: bold; }
        .proxy-name { text-align: left !important; }
        .child-table { padding: 10px; border-radius: 5px; margin-top: 5px; }

        /* Colors for Each Stage */
        th.dev, .child-table.dev th { background-color: #007bff !important; color: white !important; }
        th.hf,  .child-table.hf th  { background-color: #6f42c1 !important; color: white !important; }
        th.sit, .child-table.sit th { background-color: #28a745 !important; color: white !important; }
        th.stg, .child-table.stg th { background-color: #ffc107 !important; color: black !important; }
        th.uat, .child-table.uat th { background-color: #dc3545 !important; color: white !important; }

        /* Darker Backgrounds for Child Tables */
        .stage-dev { background-color: #0056b3 !important; }
        .stage-hf  { background-color: #4b0082 !important; }
        .stage-sit { background-color: #1e7e34 !important; }
        .stage-stg { background-color: #c69500 !important; }
        .stage-uat { background-color: #a71d2a !important; }

        /* Adjustments for full expansion */
        .stage-dev, .stage-hf, .stage-sit, .stage-stg, .stage-uat {
            display: table-row;
        }

        /* Optional: Remove hover effects */
        .toggle-btn, .toggle-all-btn {
            cursor: default;
            color: inherit;
            font-weight: normal;
            text-decoration: none;
        }
    </style>
</head>
<body class="container my-4">
    <h2 class="mb-4 text-center">API Proxy Deployment Status</h2>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>API Proxy</th>
                <th class="dev">DEV</th>
                <th class="hf">HF</th>
                <th class="sit">SIT</th>
                <th class="stg">STG</th>
                <th class="uat">UAT</th>
            </tr>
        </thead>
        <tbody>
`;

// Process each proxy
data.forEach(proxy => {
  // Proxy header
  htmlContent += `
    <tr class="proxy-header">
        <td class="proxy-name">
            <strong>${proxy.apiproxy}</strong>
        </td>
        <td colspan="5"></td>
    </tr>
  `;

  // For each stage
  for (const [stageKey, stageName] of Object.entries(stages)) {
    const stageClass = `stage-${stageKey}`;
    const tableClass = `child-table ${stageKey}`;

    // Stage row
    htmlContent += `
    <tr class="${stageClass}">
        <td colspan="6">
            <div class="${tableClass} p-3">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th colspan="3">${stageName} (${stageKey.toUpperCase()})</th>
                        </tr>
                        <tr>
                            <th>Privacy</th>
                            <th>Environment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    // Privacy types
    ['priv', 'pub'].forEach(privacy => {
      const envKeyPrefix = `env1${stageKey}-${privacy}`;
      const propertyKeys = Object.keys(proxy).filter(key => key.startsWith(envKeyPrefix));
      let statusContent = '';

      const revisionKey = `${envKeyPrefix}_revision`;
      const isDeployed = proxy[revisionKey] !== -1;

      if (!isDeployed) {
        statusContent = '<span class="not-deployed">Not Deployed</span>';
      } else {
        // Collect all properties for this environment and type
        const properties = {};
        propertyKeys.forEach(key => {
          const propName = key.replace(`${envKeyPrefix}_`, '');
          properties[propName] = proxy[key];
        });

        // Build status content
        statusContent = '';
        for (const [prop, value] of Object.entries(properties)) {
          if (value) {
            const propLabel = prop.charAt(0).toUpperCase() + prop.slice(1);
            statusContent += `<strong>${propLabel}:</strong> ${value}<br>`;
          }
        }
        // Remove the last <br>
        statusContent = statusContent.replace(/<br>$/, '');
      }

      const privacyLabel = privacy.toUpperCase();

      htmlContent += `
        <tr>
            <td><strong>${privacyLabel}</strong></td>
            <td>${envKeyPrefix}</td>
            <td>${statusContent}</td>
        </tr>
      `;
    });

    // Close stage table
    htmlContent += `
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
    `;
  }
});

// Close HTML content
htmlContent += `
        </tbody>
    </table>
</body>
</html>
`;

// Write the HTML content to index.html
fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
console.log('index.html has been generated successfully.');

// Now generate image.svg by wrapping the content of index.html
let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract styles from <style> tags in <head>
let styleContent = '';
const styleMatches = indexHtmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
if (styleMatches) {
  styleMatches.forEach(function(match) {
    const contentMatch = match.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    if (contentMatch) {
      styleContent += contentMatch[1];
    }
  });
}

// Extract body content
let bodyContent = '';
const bodyMatch = indexHtmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  bodyContent = bodyMatch[1];
} else {
  // If no body tag found, use the entire content as body content
  bodyContent = indexHtmlContent;
}

// Build the SVG content
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        ${styleContent}
      </style>
      ${bodyContent}
    </div>
  </foreignObject>
</svg>`;

// Write the SVG content to image.svg
fs.writeFileSync(imageSvgPath, svgContent, 'utf8');
console.log('image.svg has been generated successfully.');