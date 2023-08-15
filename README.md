# Image Item Recognizer

This is an exciting and innovative project that was developed to identify objects in an image. In this README you will find all the information you need to understand and start contributing to the project.

An application that recognizes objects or items in an image based on an AI model from **Clarifai**.

![App Preview]()


## Technologies Used

The project was developed using the following technologies:

- Programming Language: **Typescript**
- [React Native](https://docs.expo.dev) with [Expo](https://docs.expo.dev)
- [Clarifai](https://clarifai.com) using the model [**general-image-recognition**](https://clarifai.com/clarifai/main/models/general-image-recognition)

## Installation Guide

This guide is designed to help you set up and run the Landing Page on your local machine for development and testing purposes.

### Requirements

Before starting the installation process, make sure you have the following tools installed on your system:

- [Node.js (versão 12 ou superior)](https://nodejs.org/)
- Expo CLI
```bash
npm install -g expo-cli
```
- [Git](https://git-scm.com/)


To configure the local **development environment**, follow the steps below:

1. Clone this repository to your local machine.
```bash
git clone https://github.com/arnaldoucuassapi/image-item-recognizer.git
```

2. Install the required dependencies.
```bash
cd image-item-recognizer
npm install
```

3. Run the development server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

4. Configure environment variables

Create an .env file in the root of the project and set the following environment variables:

```bash 
EXPO_PUBLIC_PAT = "your_clarifai_pat"
EXPO_PUBLIC_USER_ID = "your_clarifai_user_id"
EXPO_PUBLIC_APP_ID = "your_clarifai_app_id"
EXPO_PUBLIC_MODEL_ID = "your_clarifai_model_id"
EXPO_PUBLIC_MODEL_VERSION_ID = "your_clarifai_model_version_id"
```

Open the application Expo Go in your device and scan the QR code to see the result.


Make sure you have the correct versions of technologies and dependencies installed to avoid compatibility issues.

## How to Contribute
If you want to contribute to the project, please follow the steps below:

1. Fork this repository and clone it to your local machine.
```shell
git clone https://github.com/arnaldoucuassapi/image-item-recognizer.git
```

2. Create a branch for your contribution.
```shell
git checkout -b minha-contribuicao
```

3. Make the necessary changes and commit them.
```shell
git commit -m "Descrição das alterações"
```

4. Push the changes to your fork repository.
```shell
git push origin minha-contribuicao
```

5. Open a pull request on this repository and wait for your contribution to be reviewed and approved.

I hope you enjoy the project and I look forward to receiving your contributions!
