const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  let original = content;
  
  // Replace whileInView without viewport
  content = content.replace(/whileInView=\{\{([^}]+)\}\}(?!\s*viewport)/g, 'whileInView={{$1}}\n              viewport={{ once: true, margin: "300px" }}');
  
  // Replace viewport={{ once: true }} with margin
  content = content.replace(/viewport=\{\{\s*once:\s*true\s*\}\}/g, 'viewport={{ once: true, margin: "300px" }}');
  
  if (original !== content) {
    fs.writeFileSync(fp, content);
    console.log('Updated ' + f);
  }
});
