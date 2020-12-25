(function () {
  //Create a block path messages for each position
  var blockedPathMessages = [];
  blockedPathMessages[0] = "It's too dangerous to move that way.";
  blockedPathMessages[1] = "A mysterious force holds you back.";
  blockedPathMessages[2] = "A tangle of thorns blocks your way.";
  blockedPathMessages[3] = "You can't step over the dragon.";
  blockedPathMessages[4] = "";
  blockedPathMessages[5] = "The gate locks shut.";
  blockedPathMessages[6] = "The river is too deep to cross.";
  blockedPathMessages[7] = "The trees are too thick to pass.";
  blockedPathMessages[8] = "You're too scared to go that way.";

  //Create img map
  var images = [];
  images[0] = "keep.png";
  images[1] = "well.png";
  images[2] = "glade.png";
  images[3] = "dragon.png";
  images[4] = "path.png";
  images[5] = "gate.png";
  images[6] = "river.png";
  images[7] = "bench.png";
  images[8] = "cottage.png";

  //Create the map
  var map = [];
  map[0] = "An old stone keep";
  map[1] = "A deep well.";
  map[2] = "A sunny glade.";
  map[3] = "A sleeping dragon.";
  map[4] = "A narrow pathway.";
  map[5] = "An ancient gate.";
  map[6] = "The edge of a river.";
  map[7] = "A lonely wooden bench.";
  map[8] = "An isolated cottage. Faint music comes from inside.";

  //Set the player starting location
  var mapLocation = 4;

  //Create an array Help messages
  var helpMessages = [];
  helpMessages[0] = "";
  helpMessages[1] =
    "I wonder if you could 'use' something to find out how deep" +
    " the well is?";
  helpMessages[2] = "";
  helpMessages[3] = "Maybe if you had the sword, you could slay the dragon?";
  helpMessages[4] = "";
  helpMessages[5] = "";
  helpMessages[6] = "";
  helpMessages[7] = "";
  helpMessages[8] = "This seems like a nice play for music.";

  //Initialize the backpack
  var backpack = [];

  //Initialize the player input
  var playersInput = "";

  //Initialize the gameMessage
  var gameMessage = "<br>Welcome to Lyrica! ";
  gameMessage += "Try any of these words: ";
  gameMessage += "north, east, south, west, take, drop, ";
  gameMessage += "use, stone, flute, sword, help.";

  //Create an array of items and location of them
  var items = ["stone"];
  var itemLocation = [6];

  var itemsIKnow = ["flute", "stone", "sword"];
  var item = "";

  //Create an array of actions the game understand
  //and the variable set the current actions
  var actionsIKnow = [
    "north",
    "east",
    "south",
    "west",
    "help",
    "take",
    "use",
    "drop",
  ];
  var action = "";

  //The output and input element
  var output = document.querySelector("#output");
  var input = document.querySelector("#input");

  //The image element
  var image = document.querySelector("img");

  //The button
  var button = document.querySelector("#button");
  button.style.cursor = "pointer";
  button.addEventListener("click", clickHandler, false);
  button.addEventListener("mousedown", mousedownHandler, false);
  button.addEventListener("mouseout", mouseoutHandler, false);

  //Listen for enter key presses
  window.addEventListener("keydown", keydownHandler, false);

  //Display the player location
  render();

  function mousedownHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
    button.style.background =
      "linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
  }

  function mouseoutHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  }

  function clickHandler() {
    button.style.background =
      "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
    button.style.background =
      "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";

    playGame();
  }

  function keydownHandler(event) {
    if (event.code === "Enter") {
      playGame();
    }
  }
  function playGame() {
    //Get the player's input and convert it to lowercase
    playersInput = input.value;
    playersInput = playersInput.toLowerCase();

    //Reset the value from the previous turn
    gameMessage = "";
    action = "";

    //Figure out the player's action
    for (i = 0; i < actionsIKnow.length; i++) {
      if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
        action = actionsIKnow[i];
        console.log("player's action: " + action);
        break;
      }
    }

    //Figure out the item the player wants
    for (i = 0; i < itemsIKnow.length; i++) {
      if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
        item = itemsIKnow[i];
        console.log("player's item: " + item);
      }
    }

    //Choose the corect action
    switch (action) {
      case "north":
        if (mapLocation >= 3) {
          mapLocation -= 3;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "east":
        if (mapLocation % 3 != 2) {
          mapLocation += 1;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "south":
        if (mapLocation < 6) {
          mapLocation += 3;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "west":
        if (mapLocation % 3 != 0) {
          mapLocation -= 1;
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case "help":
        //Display a hint if there is one at this location
        if (helpMessages[mapLocation] !== "") {
          gameMessage = helpMessages[mapLocation];
        }
        gameMessage += "Try any of these words: ";
        gameMessage += "north, east, south, west, take, drop, ";
        gameMessage += "use, stone, flute, sword.";
        break;

      case "drop":
        dropItem();
        break;
      case "take":
        takeItem();
        break;
      case "use":
        useItem();
        break;
      default:
        gameMessage = "I don't understand...";
    }
    //Render the game
    render();
  }
  //Taking items
  function takeItem() {
    //Find the index number of the item in the items array
    var itemIndexNumber = items.indexOf(item);

    //Does the item exist in the game world
    //and is it at the player's current location?
    if (
      itemIndexNumber !== -1 &&
      itemLocation[itemIndexNumber] === mapLocation
    ) {
      gameMessage = "You take the " + item + ".";

      //Add the item to the player's backpack
      backpack.push(item);

      //Remove the item from the game world
      items.splice(itemIndexNumber, 1);
      itemLocation.splice(itemIndexNumber, 1);

      //Display in the console for testing
      console.log("World items: " + items);
      console.log("backpack items: " + backpack);
    } else {
      //Message if you try and take an item
      //that isn't in the current location
      gameMessage = "You can't do that.";
    }
  }

  function dropItem() {
    //Try to drop-off the item only if the backpack isn't empty
    if (backpack.length !== 0) {
      //Find the item's array index number in the backpack
      var backpackIndexNumber = backpack.indexOf(item);

      //The item is in the backpack if backpack index number is not -1
      if (backpackIndexNumber !== -1) {
        //Tell the player that the items has been drop
        gameMessage = "You dropped the " + item + ".";

        //Add the item from backpack to the game world
        items.push(backpack[backpackIndexNumber]);
        itemLocation.push(mapLocation);

        //Remove the item from the player's backpack
        backpack.splice(backpackIndexNumber, 1);
      } else {
        //Message if the player try to drop something that is not in the backpack
        gameMessage = "You can't do that.";
      }
    } else {
      gameMessage = "You're not carrying anything!";
    }
  }

  function useItem() {
    //1.Find out if the item is in the backpack

    //Find the itemsArray index number in the backpack
    var backpackIndexNumber = backpack.indexOf(item);

    //If the index number is -1 then it isn't in the backpack
    //Tell the player that he is not carrying it
    if (backpackIndexNumber === -1) {
      gameMessage = "You're not carrying it.";
    }

    //If there are no items tell the player that the backpack is empty
    if (backpack.length === 0) {
      gameMessage += "Your backpack is empty";
    }

    //2.It the item is found in the backpack
    //figure what to do with it

    if (backpackIndexNumber !== -1) {
      switch (item) {
        case "flute":
          if (mapLocation === 8) {
            gameMessage = "Beautiful music fills the air. ";
            gameMessage += "An wizend old man steps outside ";
            gameMessage += "and hands you a sword.";

            //Add the sword to the world
            items.push("sword");
            itemLocation.push(mapLocation);
            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "You try and play the flute ";
            gameMessage += "but it makes no sound here.";
          }
          break;
        case "sword":
          if (mapLocation === 3) {
            gameMessage = "You swing the sword and slay the dragon!";
            gameMessage += "You have saved the Forest of Lyrica!!";
            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "You swing the sword listlessly";
          }
          break;
        case "stone":
          if (mapLocation === 1) {
            gameMessage = "You drop the stone in the well";
            gameMessage = " A magical flute appears!";

            //Remove the item from players backpack
            backpack.splice(backpackIndexNumber, 1);

            //Add the flute to the game World
            items.push("flute");
            itemLocation.push(mapLocation);

            //Reset the location's help message
            helpMessages[mapLocation] = "";
          } else {
            gameMessage = "You fumble with the stone in the pocket.";
          }
          break;
      }
    }
  }
  //Function render
  function render() {
    output.innerHTML = map[mapLocation];
    image.src = "images/" + images[mapLocation];

    //Display an item if there's one in this location
    //1. Loop through all the game items
    for (i = 0; i < items.length; i++) {
      //find out if there is an item in this location
      if (mapLocation === itemLocation[i]) {
        //Display it
        output.innerHTML = "You see a <strong>" + items[i] + "</strong> here.";
      }
    }

    //Display the backpack content
    if (backpack.length !== 0) {
      output.innerHTML += "<br>You are carring: " + backpack.join(", ");
    }
    //Display the game message
    output.innerHTML += "<br><em>" + gameMessage + "</em>";

    //Clear the input field
    input.value = "";
  }
})();
