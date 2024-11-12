import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import Quill from 'quill'
import Block from 'quill/blots/block';

import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";

Block.tagName = "DIV";
Quill.register(Block, true);

@Component({
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-default',
  standalone: true,
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements AfterViewInit {
  editorContent: string = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

  private quillInstance: any;

  async exportPdf() {
    const delta = this.quillInstance.getContents();
    const blob = await pdfExporter.generatePdf(delta);
    saveAs(blob as Blob, "pdf-export.pdf");
  }

  setUpQuill() {
    this.quillInstance = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "strike", "underline"],
          ["code-block", "blockquote"],
          [{ size: ["normal", "small", "large", "huge"] }],
          ["image", "video", "link", "formula"],
          [{ list: "bullet" }, { list: "ordered" }]
        ]
      }
    });

    this.quillInstance.setText(this.editorContent);
  }

  ngAfterViewInit() {
    setTimeout(() => this.setUpQuill(), 1500);
  }
}
