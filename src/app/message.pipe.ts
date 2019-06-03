import { Pipe, PipeTransform } from "@angular/core";
import { Message } from "./entities/message";

@Pipe({
  name: "messageFilter"
})
export class MessagePipe implements PipeTransform {
  titleArray: Message[];
  contentArray: Message[];
  transform(messages: Message[], search: any = ""): any {
    if (search.trim() === "") return messages;
    // First filter by a title and  put that into array1

    this.titleArray = messages.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    // then filter by description and put that into array2
    this.contentArray = messages.filter(item =>
      item.content.toLowerCase().includes(search.toLowerCase())
    );
    // join array1 and array2 and return it
    const searchPriority = this.titleArray.concat(this.contentArray);
    return searchPriority;
  }
}
