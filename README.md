# Buisness Card OCR

Ever receive a business card but don’t want to take the time to type all the details in? This program aims to solve that problem by extracting the information from a business card using OCR.

## Usage

This project aims to extract information from a business card using OCR `tesseract.js`. The program takes a ` bmp, jpg, png, pbm, webp` file as input and outputs the name, phone number, and email address of the person on the business card. If OCR is unable to extract the information, the program will output `None` for the respective field, and if the file is not a valid image file, the program will alert the user.
User will get a json response with the extracted information.

## Installation

To install the program, clone the repository and run `npm install` to install the dependencies. To run the program, run `npm run dev` and follow the prompts.

## To Do

- Make it responsive
- Better OCR accuracy
- Store the data in a database
