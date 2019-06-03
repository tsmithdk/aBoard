import { User } from "./entities/user";
import { MessagePipe } from "./message.pipe";
import { Message } from "./entities/message";

describe("MessagePipe", () => {
  it("create an instance", () => {
    const pipe = new MessagePipe();
    expect(pipe).toBeTruthy();
  });

  it("should show nothing", () => {
    const pipe = new MessagePipe();

    let messages: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    let stateAfter: Message[] = [];

    expect(pipe.transform(messages, "you should not find this")).toEqual(
      stateAfter
    );
  });

  it("should find something", () => {
    const pipe = new MessagePipe();

    let messages: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    let stateAfter: Message[] = [
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    expect(pipe.transform(messages, "Msg")).toEqual(stateAfter);
  });

  it("should find multiple results", () => {
    const pipe = new MessagePipe();

    let messages: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hejMsg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "MsgOOO",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    let stateAfter: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hejMsg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "MsgOOO",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    expect(pipe.transform(messages, "Msg")).toEqual(stateAfter);
  });

  it("should return all results when search input is empty", () => {
    const pipe = new MessagePipe();
    let messages: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    let stateAfter: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    expect(pipe.transform(messages, "")).toEqual(stateAfter);
  });

  it("should return all results when search parameter is NOT passed", () => {
    const pipe = new MessagePipe();
    let messages: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    let stateAfter: Message[] = [
      {
        _id: "5cea89f1b10029d435b64e65",
        title: "hej",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      },
      {
        _id: "1c3a89f1b10029d435b64e22",
        title: "Msg",
        content: "paigepbegpib",
        image: "",
        user: {} as User,
        date: new Date("2018-01-01"),
        likes: [],
        dislikes: [],
        selector: "aboard-message"
      }
    ];

    expect(pipe.transform(messages)).toEqual(stateAfter);
  });
});
