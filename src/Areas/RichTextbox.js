import React from "react";
import $ from "jquery";
import "./RickTextbox.css";

function RichTextbox() {
  var colorPalette = [
    "000000",
    "FF9966",
    "6699FF",
    "99FF66",
    "CC0000",
    "00CC00",
    "0000CC",
    "333333",
    "0066FF",
    "FFFFFF",
  ];
  var forePalette = $(".fore-palette");
  var backPalette = $(".back-palette");

  for (var i = 0; i < colorPalette.length; i++) {
    forePalette.append(
      '<a href="#" data-command="forecolor" data-value="' +
        "#" +
        colorPalette[i] +
        '" style={{background-color:' +
        "#" +
        colorPalette[i] +
        ';}}" className="palette-item"></a>'
    );
    backPalette.append(
      '<a href="#" data-command="backcolor" data-value="' +
        "#" +
        colorPalette[i] +
        '" style={{background-color:' +
        "#" +
        colorPalette[i] +
        ';}}" className="palette-item"></a>'
    );
  }

  $(".toolbar a").on("click", function (e) {
    var command = $(this).data("command");
    if (command == "h1" || command == "h2" || command == "p") {
      document.execCommand("formatBlock", false, command);
    }
    if (command == "forecolor" || command == "backcolor") {
      document.execCommand(
        $(this).data("command"),
        false,
        $(this).data("value")
      );
    }
    if (command == "createlink") {
      const url = prompt("Enter the link here: ", "http://");
      document.execCommand($(this).data("command"), false, url);
    } else document.execCommand($(this).data("command"), false, null);
  });

  return (
    <div className="RichTextbox">
      <link
        href="https://fonts.googleapis.com/css?family=Dosis|Candal"
        rel="stylesheet"
        type="text/css"
      />
      <div className="toolbar">
        <a href="#" data-command="undo">
          <i className="fa fa-undo"></i>
        </a>
        <a href="#" data-command="redo">
          <i className="fa fa-repeat"></i>
        </a>
        <div className="fore-wrapper">
          <i className="fa fa-font" style={{ color: "#C96" }}></i>
          <div className="fore-palette"></div>
        </div>
        <div className="back-wrapper">
          <i className="fa fa-font" style={{ background: "#C96" }}></i>
          <div className="back-palette"></div>
        </div>
        <a href="#" data-command="bold">
          <i className="fa fa-bold"></i>
        </a>
        <a href="#" data-command="italic">
          <i className="fa fa-italic"></i>
        </a>
        <a href="#" data-command="underline">
          <i className="fa fa-underline"></i>
        </a>
        <a href="#" data-command="strikeThrough">
          <i className="fa fa-strikethrough"></i>
        </a>
        <a href="#" data-command="justifyLeft">
          <i className="fa fa-align-left"></i>
        </a>
        <a href="#" data-command="justifyCenter">
          <i className="fa fa-align-center"></i>
        </a>
        <a href="#" data-command="justifyRight">
          <i className="fa fa-align-right"></i>
        </a>
        <a href="#" data-command="justifyFull">
          <i className="fa fa-align-justify"></i>
        </a>
        <a href="#" data-command="indent">
          <i className="fa fa-indent"></i>
        </a>
        <a href="#" data-command="outdent">
          <i className="fa fa-outdent"></i>
        </a>
        <a href="#" data-command="insertUnorderedList">
          <i className="fa fa-list-ul"></i>
        </a>
        <a href="#" data-command="insertOrderedList">
          <i className="fa fa-list-ol"></i>
        </a>
        <a href="#" data-command="h1">
          H1
        </a>
        <a href="#" data-command="h2">
          H2
        </a>
        <a href="#" data-command="createlink">
          <i className="fa fa-link"></i>
        </a>
        <a href="#" data-command="unlink">
          <i className="fa fa-unlink"></i>
        </a>

        <a href="#" data-command="p">
          P
        </a>
        <a href="#" data-command="subscript">
          <i className="fa fa-subscript"></i>
        </a>
        <a href="#" data-command="superscript">
          <i className="fa fa-superscript"></i>
        </a>
      </div>
      <div id="editor" contentEditable>
        <h1>A Heading.</h1>
        <p>Some text that you can format. Try inserting an image or a link.</p>
      </div>
    </div>
  );
}

export default RichTextbox;
