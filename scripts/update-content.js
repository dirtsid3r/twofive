const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define content types and their file paths
const contentTypes = {
  projects: path.join(__dirname, '../app/data/projects.json'),
  workExperience: path.join(__dirname, '../app/data/work-experience.json'),
  blogPosts: path.join(__dirname, '../app/data/blog-posts.json')
};

// Function to read JSON file
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return [];
  }
}

// Function to write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Successfully updated ${filePath}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
}

// Function to add a new item
function addItem(contentType) {
  const filePath = contentTypes[contentType];
  const data = readJsonFile(filePath);
  
  if (contentType === 'projects') {
    const newProject = {
      name: '',
      description: '',
      video: '',
      link: ''
    };
    
    rl.question('Project name: ', (name) => {
      newProject.name = name;
      rl.question('Description: ', (description) => {
        newProject.description = description;
        rl.question('Video URL: ', (video) => {
          newProject.video = video;
          rl.question('Project link: ', (link) => {
            newProject.link = link;
            data.push(newProject);
            writeJsonFile(filePath, data);
            mainMenu();
          });
        });
      });
    });
  } else if (contentType === 'workExperience') {
    // Similar implementation for work experience
    // ...
  }
}

// Function to edit an existing item
function editItem(contentType) {
  const filePath = contentTypes[contentType];
  const data = readJsonFile(filePath);
  
  console.log('\nCurrent items:');
  data.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name || item.title}`);
  });
  
  rl.question('\nEnter the number of the item to edit (or 0 to cancel): ', (answer) => {
    const index = parseInt(answer) - 1;
    if (index < 0 || index >= data.length) {
      console.log('Operation cancelled or invalid selection');
      mainMenu();
      return;
    }
    
    if (contentType === 'projects') {
      const project = data[index];
      rl.question(`Project name (${project.name}): `, (name) => {
        if (name) project.name = name;
        rl.question(`Description (${project.description}): `, (description) => {
          if (description) project.description = description;
          rl.question(`Video URL (${project.video}): `, (video) => {
            if (video) project.video = video;
            rl.question(`Project link (${project.link}): `, (link) => {
              if (link) project.link = link;
              writeJsonFile(filePath, data);
              mainMenu();
            });
          });
        });
      });
    } else if (contentType === 'workExperience') {
      // Similar implementation for work experience
      // ...
    }
  });
}

// Main menu function
function mainMenu() {
  console.log('\n--- Content Management ---');
  console.log('1. Add new project');
  console.log('2. Edit existing project');
  console.log('3. Add new work experience');
  console.log('4. Edit existing work experience');
  console.log('5. Exit');
  
  rl.question('\nSelect an option: ', (answer) => {
    switch (answer) {
      case '1':
        addItem('projects');
        break;
      case '2':
        editItem('projects');
        break;
      case '3':
        addItem('workExperience');
        break;
      case '4':
        editItem('workExperience');
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option');
        mainMenu();
    }
  });
}

// Start the program
console.log('Welcome to the content management tool');
mainMenu();

rl.on('close', () => {
  console.log('Content management completed');
  process.exit(0);
}); 