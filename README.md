# Environmental Impact Calculator

This is a web-based tool that helps individuals calculate their environmental footprint based on various lifestyle choices, such as travel, diet, energy usage, and waste management. It provides actionable insights and suggestions to reduce the environmental impact.

## Features

- **Travel Impact**: Calculate carbon footprint based on daily travel (in km).
- **Diet Impact**: Calculate carbon footprint based on meat consumption.
- **Energy Usage**: Calculate carbon footprint based on daily energy usage and winter energy usage.
- **Waste and Recycling**: Calculate the impact based on plastic waste, recycling rate, and eco-friendly shopping habits.
- **Results**: Displays carbon footprint, water usage, and suggestions to reduce impact.

## Technology Stack

- **Frontend**: HTML, CSS (TailwindCSS), JavaScript (TypeScript)
- **Backend**: Ruby with Sinatra
- **Styling**: TailwindCSS for a responsive and modern UI

## Prerequisites

To run this project, you'll need the following installed:

- **[Ruby](https://www.ruby-lang.org/en/documentation/)** (version 3.x or later)
- **[Node.js](https://nodejs.org/)** (version 14.x or later)
- **[npm](https://www.npmjs.com/)** (for managing dependencies)
- **[Bundler](https://bundler.io/)** (for Ruby dependency management)
- **[TailwindCSS](https://tailwindcss.com/)** (for styling)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/sudhantechie/Envicx.git
cd Envicx

### 2. Node.js Dependencies

```bash
npm install

### 3. Ruby Dependencies

```bash
bundle install

### 4. Build Frontend Assets

After installing dependencies, you need to build the frontend files:

#### Build JavaScript
```bash
npm run build:ts

#### Build CSS
To generate the CSS file using TailwindCSS, run the following command:

```bash
npm run build:css

### 5. Run the Application

```bash
npm start

The application will run on http://localhost:4567.

