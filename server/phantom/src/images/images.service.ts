import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Readable } from 'stream';
const { google } = require('googleapis');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

@Injectable()
export class ImagesService {
  public drive;
  constructor() {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      String(process.env.DRIVE_CLIENT_EMAIL),
      null,
      String(process.env.DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n')),
      scopes,
    );
    this.drive = google.drive({ version: 'v3', auth });
  }

  async deleteFile(id) {
    this.drive.files
      .delete({
        fileId: id,
      })
      .then(
        async function(response) {
          return { status: 'success' };
        },
        function(err) {
          throw new NotFoundException();
        },
      );
  }

  async uploadFile(fileName, mimeType, stream) {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(stream);
    readable.push(null);
    var fileMetadata = {
      name: fileName,
    };
    var media = {
      mimeType: mimeType,
      body: readable,
    };
    let res = await this.drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    if (res) {
      return [{ id: res.data.id }];
    } else {
      throw new BadRequestException();
    }
  }
}
