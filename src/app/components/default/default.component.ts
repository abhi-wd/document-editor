import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import Quill from 'quill'
import Block from 'quill/blots/block';

import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Block.tagName = "DIV";
Quill.register(Block, true);

@Component({
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-default',
  standalone: true,
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements AfterViewInit {
  editorContent: string = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

  documentData = {
    title: "How to Host a Webpage on GitHub",
    subheading: "A Step-by-Step Guide to Publishing Your First Webpage",
    steps: [
      {
        step_number: 1,
        title: "Create a GitHub Account",
        description: "Go to GitHub's official website and sign up for a free account if you don't have one.",
        details: "You will need a valid email address to register. Once you sign up, you will be redirected to your GitHub dashboard."
      },
      {
        "step_number": 2,
        "title": "Create a New Repository",
        "description": "Navigate to the 'Repositories' tab and click the 'New' button to create a repository for your webpage.",
        "details": "Make sure to initialize your repository with a README file. Name your repository with a unique name."
      },
      {
        "step_number": 3,
        "title": "Upload Your Website Files",
        "description": "Upload your HTML, CSS, and JavaScript files to the repository.",
        "details": "Drag and drop your files into the repository's file manager, or use Git to push files directly from your local computer."
      },
      {
        "step_number": 4,
        "title": "Enable GitHub Pages",
        "description": "In the repository settings, scroll down to the 'GitHub Pages' section and select the 'main' branch as the source.",
        "details": "Once enabled, GitHub will automatically serve your webpage at the URL: https://yourusername.github.io/repositoryname."
      },
      {
        "step_number": 5,
        "title": "Access Your Website",
        "description": "After setting up GitHub Pages, your website will be live.",
        "details": "Visit the URL provided to see your hosted webpage."
      }
    ],
    side_notes: [
      {
        note_title: "Important",
        note_description: "Ensure that your repository is public; otherwise, GitHub Pages will not be able to serve your website."
      },
      // Other notes here...
    ]
  };

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

    this.insertDocumentData();
  }


  insertDocumentData() {
    if (!this.quillInstance) {
      console.error("Quill instance is not available.");
      return;
    }

    const { title, subheading, steps, side_notes } = this.documentData;

    let contentHTML = `<h1>${title}</h1><h2>${subheading}</h2><hr>`;

    steps.forEach(step => {
      contentHTML += `
        <h2>Step ${step.step_number}: ${step.title}</h2>
        <p><strong>Description:</strong> ${step.description}</p>
        <p>${step.details}</p><br>`;
    });

    side_notes.forEach(note => {
      contentHTML += `
        <h2>${note.note_title}</h2>
        <p>${note.note_description}</p><br>`;
    });

    console.log("Simplified contentHTML:", contentHTML);

    try {
      if (contentHTML && contentHTML.trim() !== '') {
        this.quillInstance.root.innerHTML = '';
        this.quillInstance.clipboard.dangerouslyPasteHTML(0, contentHTML);
      } else {
        console.warn("Converted Delta is empty; fallback to plain text.");
        this.quillInstance.setText(`${title}\n\n${subheading}\n\n` +
          steps.map(step => `Step ${step.step_number}: ${step.title}\n${step.description}\n${step.details}`).join('\n\n') +
          "\n\n" +
          side_notes.map(note => `${note.note_title}\n${note.note_description}`).join('\n\n')
        );
      }
    } catch (error) {
      console.error("Error converting HTML to Delta:", error);
      this.quillInstance.setText("An error occurred while inserting content.");
    }
  }



  ngAfterViewInit() {
    setTimeout(() => this.setUpQuill(), 1500);
  }

  isChatOpen: boolean = false;
  userMessage: string = '';

  conversation: { sender: 'user' | 'bot', message: string }[] = [
    { sender: 'user', message: 'Hello!' },
    { sender: 'bot', message: 'Hi there! How can I assist you today?' },
    { sender: 'user', message: 'Hello!' },
    { sender: 'bot', message: 'Hi there! How can I assist you today?' },
    { sender: 'user', message: 'Hello!' },
    { sender: 'bot', message: 'Hi there! How can I assist you today?' },
    { sender: 'user', message: 'Hello!' },
    { sender: 'bot', message: 'Hi there! How can I assist you today?' },
    { sender: 'user', message: 'Hello!' },
    { sender: 'bot', message: 'Hi there! How can I assist you today?' },
  ];

  toggleChatPopup() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.conversation.push({ sender: 'user', message: this.userMessage });

      // Call the API to get a response from the bot
      // this.http.post<{ response: string }>('/api/chatbot', { message: this.userMessage }).subscribe(
      //   (response) => {
      //     // Add the bot's response to the conversation
      //     this.conversation.push({ sender: 'bot', message: response.response });
      //   },
      //   (error) => {
      //     console.error("Error in chatbot response:", error);
      //     this.conversation.push({ sender: 'bot', message: 'Sorry, something went wrong.' });
      //   }
      // );

      // Clear the user's message input
      this.userMessage = '';
    }
  }
}
