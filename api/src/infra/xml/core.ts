import { usersXml } from "@/infra/xml/user";
import fs from "fs";
import xml2js from "xml2js";

export class XmlCore<T> {
  private xmlData: T | undefined;

  async read(filePath: string): Promise<this> {
    const data = fs.readFileSync(filePath, "utf8");
    this.xmlData = await xml2js.parseStringPromise(data);
    return this;
  }

  entity<U>(convertFn: (xml: T) => U[]): U[] {
    return convertFn(this.xmlData || ({} as T));
  }
}

export class Xml {
  users = usersXml;
}
