# XKCD Comics Viewer

This project is a simple web application that allows users to view XKCD comics. It uses the XKCD API to fetch comics and display them in a user-friendly interface.

## Features

*   Browse comics: Users can navigate through comics using the "Previous", "Next", "First", and "Last" buttons.
*   Random comic: Users can view a random comic by clicking the "Random" button.
*   Search by ID: Users can search for a specific comic by entering its ID in the search form.
*   Loading indicator: A loading animation is displayed while the comic is being fetched.
*   Error handling: Error messages are displayed if there are any issues fetching the comic.

## Technologies Used

*   HTML
*   CSS
*   JavaScript
*   Bootstrap
*   XKCD API

## Setup

To run this project locally, simply open the `index.html` file in your browser.

## Usage

*   To browse comics, use the "Previous", "Next", "First", and "Last" buttons.
*   To view a random comic, click the "Random" button.
*   To search for a specific comic, enter its ID in the search form and click the "Find" button.

## API Reference

The project uses the XKCD API to fetch comics. The base URL for the API is `https://xkcd.com/`.

*   To get the latest comic, use the following URL: `https://xkcd.com/info.0.json`
*   To get a specific comic by ID, use the following URL: `https://xkcd.com/{id}/info.0.json`

## License

This project is licensed under the MIT License.