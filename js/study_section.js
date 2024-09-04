const scriptLinks = {
    "12th": {
        "notes": "https://script.google.com/macros/s/AKfycby7Dh-_aVyr75ywcfvpIyH-Gfd3n1WAbcRjUT0NocIp1rR72CFZqusIcB9vt1zHj2KEmw/exec",
        "youtube": "https://script.google.com/macros/s/AKfycbwBd1Zjf6cwkxbu5oszmuNGajxRA8XlMxX_1WANFXpWRxROd36EqMx_2DMvBAs4k_POmQ/exec",
        "books": "https://script.google.com/macros/s/AKfycbxleuXLzLThWCKVGqLtz4EEhgHLmp1G8BEEFCQj98WbjZc-mS9YsVEDuIvEocIgukoq/exec",
        "previous-exams": "prevoiuos year exam papers"
    },
    "11th": {
        "notes": "NOTES_LINK_FOR_11TH",
        "youtube": "VIDEO_LINK_FOR_11TH"
    },
    "10th": {
        "notes": "NOTES_LINK_FOR_10TH",
        "youtube": "VIDEO_LINK_FOR_10TH"
    },
    "9th": {
        "notes": "NOTES_LINK_FOR_9TH",
        "youtube": "VIDEO_LINK_FOR_9TH"
    },
    "8th": {
        "notes": "NOTES_LINK_FOR_8TH",
        "youtube": "VIDEO_LINK_FOR_8TH"
    },
    "7th": {
        "notes": "NOTES_LINK_FOR_7TH",
        "youtube": "VIDEO_LINK_FOR_7TH"
    },
    "6th": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "5th": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "4th": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "3th": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "2nd": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "1st": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "HAU": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "GJU": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "LUVAS": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "JEE": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "NEET": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "NET": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "GATE": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "CUET": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "HSSC": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "SSC": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
    "CET": {
        "notes": "NOTES_LINK_FOR_6TH",
        "youtube": "VIDEO_LINK_FOR_6TH"
    },
};

// Function to fetch and display subjects when a class is selected
function fetchSubjects(className) {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const url = scriptLinks[className] && scriptLinks[className][radioType];

    if (!url) {
        console.error('Invalid URL. Please check the radio button values and scriptLinks object.');
        return;
    }

    // Hide all subject select elements before showing the relevant one
    document.querySelectorAll('[id^="subject-select-"]').forEach(select => {
        select.style.display = 'none';
    });

    const subjectSelect = document.querySelector(`#subject-select-${className}`);
    if (!subjectSelect) {
        console.error(`Element #subject-select-${className} not found.`);
        return;
    }

    subjectSelect.style.display = 'block';
    subjectSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const subjects = data.data;

            subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject["Subject Link"]; // Use the subject link as the value
                option.textContent = subject["Subject Name"];
                subjectSelect.appendChild(option);
            });

            // Add an event listener to handle subject selection
            subjectSelect.addEventListener('change', () => {
                const selectedLink = subjectSelect.value;
                showChapterModal(selectedLink);
            });
        })
        .catch(error => {
            console.error('Error fetching subjects:', error);
            subjectSelect.innerHTML = '<option value="" disabled selected>Error loading subjects</option>';
        });
}

// Function to fetch and display chapters in the modal when a subject is selected
function showChapterModal(subjectLink) {
    const chapterSelect = document.getElementById('chapter-select');
    const loadingIcon = document.getElementById('loading-icon');
    const errorMessage = document.getElementById('error-message');
    const downloadContainer = document.getElementById('download-container');
    const downloadButton = document.getElementById('download-button');
    const videoContainer = document.getElementById('video-container');

    // Reset modal content
    chapterSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';
    chapterSelect.style.display = 'none';
    loadingIcon.style.display = 'block';
    errorMessage.style.display = 'none';
    downloadContainer.style.display = 'none';
    downloadButton.disabled = true; // Disable button initially

    // Fetch chapters using the subject link
    fetch(subjectLink)
        .then(response => response.json())
        .then(data => {
            const chapters = data.data || []; // Correctly accessing the chapters array
            loadingIcon.style.display = 'none';

            if (chapters.length > 0) {
                chapterSelect.innerHTML = '<option value="" disabled selected>Select Chapter</option>';
                chapters.forEach(chapter => {
                    const option = document.createElement('option');
                    option.value = chapter["Download Link"]; // Use the download link as the value
                    option.textContent = chapter["Chapter Name"];
                    chapterSelect.appendChild(option);
                });

                chapterSelect.style.display = 'block';
                downloadContainer.style.display = 'flex'; // Show download button
            } else {
                errorMessage.textContent = 'No chapters available.';
                downloadContainer.style.display = 'none'; // Hide the download container
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching chapters:', error);
            loadingIcon.style.display = 'none';
            errorMessage.style.display = 'block';
            videoContainer.style.display = 'none'; // Hide the video container
            downloadContainer.style.display = 'none'; // Hide the download container
        });

    // Show the modal
    const chapterModal = new bootstrap.Modal(document.getElementById('chapterModal'));
    chapterModal.show();

    // Handle chapter selection change
    chapterSelect.addEventListener('change', () => {
    const selectedChapterLink = chapterSelect.value;

    if (selectedChapterLink) {
        downloadButton.disabled = false; // Enable the download button
    
        // Check if the selected link is a YouTube link
        if (selectedChapterLink.includes('youtube.com')) {
            videoContainer.style.display = 'block'; // Show the video container
            downloadContainer.style.display = 'none'; // Hide the download container
    
            // Extract the YouTube video ID from different formats
            let videoId = '';
    
            // Handle 'youtube.com' URLs (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
            if (selectedChapterLink.includes('youtube.com')) {
                const urlParams = new URL(selectedChapterLink);
                videoId = urlParams.searchParams.get('v');
                videoContainer.innerHTML = `
                    <iframe width="460" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
            } else {
                console.error('Invalid YouTube link, unable to extract video ID.');
            }
        } else {
            videoContainer.style.display = 'none'; // Hide the video container
            downloadContainer.style.display = 'flex'; // Show the download container
    
            // Update the download button's click event to download the selected chapter
            downloadButton.onclick = () => {
                window.open(selectedChapterLink, '_blank'); // Open the link in a new tab
            };
        }
    } else {
        downloadButton.disabled = true; // Disable the button if no chapter is selected
        videoContainer.style.display = 'none'; // Hide the video container
        downloadContainer.style.display = 'none'; // Hide the download container
    }
    
});
}


document.querySelector('#class-select-sr').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-sec').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-medium').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-primary').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-University').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-AIN').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-job').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-Computer').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});

document.querySelector('#class-select-advComputer').addEventListener('change', function() {
    const radioType = document.querySelector('input[name="resource-type"]:checked')?.value;
    const className = this.value;
    if (className && radioType) {
        fetchSubjects(className);
    }
});


//  Script to Handle Selection 
window.onload = function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedRadio = urlParams.get('select');
// Function to update header and paragraph based on selected radio button
function updateContent(id) {
    let headerText = "";
    let paragraphText = "";
    switch(id) {
        case "youtube":
            headerText = "It's lecture time";
            cardsText = " Videos Lecture";
            paragraphText = "Access detailed video lectures covering all important topics. Find all study-related videos and tutorials on our YouTube channel.";
            break;
        case "notes":
            headerText = "My Notes";
            cardsText = " Study Notes";
            paragraphText = "Get Notes of every class & every subject you wanted.";
            break;
        case "previous-exams":
            headerText = "Previous Exam Papers";
            cardsText = "Exam Papers";
            paragraphText = "Review previous exam papers to prepare effectively.";
            break;
        case "books":
            headerText = "Let's See The Text Books";
            cardsText = "Books Download";
            paragraphText = "Review previous exam papers to prepare effectively.";
            break;
        case "mock-test":
            cardsText = "Mock Test";
            headerText = "You wanna give a Test";
            paragraphText = "You can also Give Test and Imporve you skills by giving them.";
            break;
        case "earn":
            cardsText ="Earn While Learn";
            headerText = "Earn While Learn";
            paragraphText = "You can earn something while in your learning phase. Read about our Earn while Learn Scheme.";
            break;
        default:
            headerText = "Select an Option";
            paragraphText = "Please choose an option to see more details.";
            break;
    }

    document.getElementById('header-text').textContent = headerText;
    document.getElementById('card-text').textContent = cardsText;
    document.getElementById('paragraph-text').textContent = paragraphText;
}
    // If the select parameter exists, trigger the radio button click
    if (selectedRadio) {
        const radioButton = document.getElementById(selectedRadio);
        if (radioButton) {
            radioButton.checked = true;
            radioButton.dispatchEvent(new Event('change'));
            updateContent(selectedRadio);  // Update content on page load based on URL
        }
    }

    // Add event listeners to update content when a radio button is clicked
    const radioButtons = document.querySelectorAll('input[name="resource-type"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
        // console.log(`Radio button with ID: ${this.id} Clicked.`);
            updateContent(this.id);
        });
    });


};


// Function to reset current state and revert to initial selection
function resetToInitialState() {

    console.log("Value is reseting")
    const chapterSelect = document.getElementById('chapter-select');
    const downloadContainer = document.getElementById('download-container');
    const videoContainer = document.getElementById('video-container');
    const downloadButton = document.getElementById('download-button');

    // Clear the chapter dropdown and reset to default option
    chapterSelect.innerHTML = '<option value="" disabled selected>Select Chapter</option>';
    chapterSelect.style.display = 'none'; // Hide the chapter select

    // Hide the download and video containers
    downloadContainer.style.display = 'none';
    videoContainer.style.display = 'none';
    videoContainer.innerHTML = ''; // Clear any video content

    // Disable the download button
    downloadButton.disabled = true;
    downloadButton.href = '#'; // Reset the link to prevent any unintended downloads

    // Hide all subject select elements before showing the relevant one
    document.querySelectorAll('[id^="subject-select-"]').forEach(select => {
        select.style.display = 'none';
    });

    // Optionally, reset the subject select to its initial state (unselected)
    document.querySelectorAll('[id^="subject-select-"]').forEach(select => {
        select.value = ''; // Reset the value to default
    });
    // Optionally, reset the subject select to its initial state (unselected)
    document.querySelectorAll('[id^="class-select"]').forEach(select => {
        select.value = ''; // Reset the value to default
    });
}

// Add event listener to all radio buttons to reset state when switching
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', resetToInitialState);
});


    // Event listeners for the buttons
    document.getElementById('join-us-button').addEventListener('click', function() {
        setModalContent('joinUs');
    });

    document.getElementById('feedback-button').addEventListener('click', function() {
        setModalContent('feedback');
    });

    document.getElementById('support-us-button').addEventListener('click', function() {
        setModalContent('supportUs');
    });

    // Function to set modal content based on the button clicked
    function setModalContent(type) {
        const dynamicContent = document.getElementById('dynamic-content');
        dynamicContent.innerHTML = ''; // Clear previous content

        if (type === 'joinUs') {
            dynamicContent.innerHTML = `
                <p>Join us on WhatsApp:</p>
                <a href="https://wa.me/+919728131692" class="btn btn-primary" target="_blank">Join via WhatsApp</a>
            `;
        } else if (type === 'feedback') {
            dynamicContent.innerHTML = `
                <p>Rate Us:</p>
                <div class="rating mb-2">
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                </div>
                <textarea id="feedback-message" class="form-control" rows="3" placeholder="Leave your feedback here..."></textarea>
            `;
        } else if (type === 'supportUs') {
            dynamicContent.innerHTML = `
                <p>Thank you for your support!</p>
                <img src="img/QR.jpg" alt="QR Code" style="max-width: 150px; margin: 10px auto;">
                <p>Scan the QR code to support us!</p>
            `;
        }
    }