
# CSS-Colors-Changer

This chrome extension is used to update, on-the-fly, on any website using colors with css custom properties (var()).

This is not very useful but interesting to code to see how to communicate between chrome extension and websites.

Should work with all chrome-based browsers. (Tested only in Chrome and Vivaldi)

## Installation

No installation is needed to write code on this project.

As a user, to use this go to `chrome://extensions`and click to `load unpackaged extension` and open src folder.

## Usage/Examples

The website has to implement colors with custom properties in that way to use this extension :

```
:root {
    --primary-color: 15 80 60;
    --secondary-color: 255 203 149;
}
```
