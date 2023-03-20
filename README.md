# Game Generator

Game Generator is an open-source project that uses OpenAI's API to generate simple game code based on a user's input description. The generated code is executed in a canvas section and users can also view and edit the code. This project is built using Next.js and the Monaco Editor.

## Features

- Takes a game description as input (maximum 200 characters)
- Generates game code using OpenAI's API
- Executes generated code in a canvas section
- Allows users to view and edit the generated code
- Responsive design for mobile devices
- Retro arcade style

## Getting Started

To get started with the Game Generator, follow these steps:

### Prerequisites

- Node.js (version 12.x or higher)
- npm (version 6.x or higher)
- Access to chatGPT 4 API (https://openai.com/waitlist/gpt-4-api)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/brunoamgouveia/game-gen.git
```

2. Navigate to the project folder:

```bash
cd game-generator
```

3. Install the required dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root folder of the project and add the following line:

```
OPENAI_API_KEY=your_openai_api_key
```

Replace `your_openai_api_key` with your actual OpenAI API key.

5. Run the local development server:

```bash
npm run dev
```

Open your browser and visit "http://localhost:3000/generate-game" to see the Game Generator page.

## Contributing

Contributions to the Game Generator project are welcome! Please feel free to submit pull requests, create issues, or suggest new features and improvements.