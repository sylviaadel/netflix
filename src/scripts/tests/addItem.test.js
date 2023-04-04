import { validText, validPrice, validImageURL } from "./addItem";

test("Verify that the title is right", () => {
  //Arrange
  const title = "Beef Dishes";

  //Action
  const addedTitle = validText(title);

  //Assert
  expect(addedTitle).toEqual(true);
});

test("Verify that title is not empty", () => {
  //Arrange
  const title = "";

  //Action
  const addedTitle = validText(title);

  //Assert
  expect(addedTitle).toEqual(false);
});

test("Verify that title is not only spaces", () => {
  //Arrange
  const title = "    ";

  //Action
  const addedTitle = validText(title);

  //Assert
  expect(addedTitle).toEqual(false);
});

test("Verify that the description is right", () => {
  //Arrange
  const description = "Beef Dishes";

  //Action
  const addedDescription = validText(description);

  //Assert
  expect(addedDescription).toEqual(true);
});

test("Verify that description is not empty", () => {
  //Arrange
  const description = "";

  //Action
  const addedDescription = validText(description);

  //Assert
  expect(addedDescription).toEqual(false);
});

test("Verify that description is not only spaces", () => {
  //Arrange
  const description = "    ";

  //Action
  const addedDescription = validText(description);

  //Assert
  expect(addedDescription).toEqual(false);
});

test("Verify that the video ID is right", () => {
  //Arrange
  const vedioID = "wehhOMoaI7A";

  //Action
  const addedVedioID = validText(vedioID);

  //Assert
  expect(addedVedioID).toEqual(true);
});

test("Verify that video ID is not empty", () => {
  //Arrange
  const vedioID = "";

  //Action
  const addedVedioID = validText(vedioID);

  //Assert
  expect(addedVedioID).toEqual(false);
});

test("Verify that vedio ID is not only spaces", () => {
  //Arrange
  const vedioID = "    ";

  //Action
  const addedVedioID = validText(vedioID);

  //Assert
  expect(addedVedioID).toEqual(false);
});