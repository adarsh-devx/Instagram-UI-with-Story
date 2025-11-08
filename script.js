(function () {
      const storiesData = [
        { dp: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=60", story: "https://images.unsplash.com/photo-1591131971581-9ef6d344ad7c?w=400&auto=format&fit=crop&q=60", username: "alexa_d" },
        { dp: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=400&auto=format&fit=crop&q=60", story: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?q=80&w=687&auto=format&fit=crop", username: "michael_k" },
        { dp: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60", story: "https://plus.unsplash.com/premium_photo-1675080431524-3e7c85323972?q=80&w=735&auto=format&fit=crop", username: "david_c" },
        { dp: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60", story: "https://images.unsplash.com/photo-1653344011324-852d98d3eb9b?w=400&auto=format&fit=crop&q=60", username: "jessica_w" },
        { dp: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60", story: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=687&auto=format&fit=crop", username: "chris_p" },
      ];

      const STORY_DURATION = 3000; // ms

      const storiesContainer = document.querySelector("#storiyan");
      const fullScreen = document.querySelector("#full-screen");
      const progress = document.querySelector("#progress");
      const userInfoImg = document.querySelector("#story-user-info img");
      const userInfoSpan = document.querySelector("#story-user-info span");
      const likeIcon = document.querySelector("#story-footer .ri-heart-line");
      const likedIcon = document.querySelector("#story-footer .ri-heart-fill");

      const storiesHTML = storiesData.map((story, index) => `
        <div class="story" data-index="${index}">
          <img src="${story.dp}" alt="Profile picture for ${story.username}"/>
        </div>
      `).join('');
      storiesContainer.innerHTML = storiesHTML;

      let activeStoryTimeout;

      function showStory(index) {
        const storyData = storiesData[index];
        const storyElement = storiesContainer.querySelector(`[data-index='${index}']`);

        if (!storyData || !storyElement) return;

        // Reset and start progress bar animation
        progress.classList.remove("active");
        void progress.offsetWidth; // Trigger reflow
        progress.classList.add("active");

        fullScreen.classList.add("active");
        fullScreen.style.backgroundImage = `url(${storyData.story})`;
        userInfoImg.src = storyData.dp;
        userInfoSpan.textContent = storyData.username;

        // Clear any existing timeout
        if (activeStoryTimeout) {
          clearTimeout(activeStoryTimeout);
        }

        activeStoryTimeout = setTimeout(() => {
          fullScreen.classList.remove("active");
          storyElement.classList.add("seen");
        }, STORY_DURATION);
      }

      function toggleLike() {
        const isLiked = likedIcon.style.display === "block";
        likedIcon.style.display = isLiked ? "none" : "block";
        likeIcon.style.display = isLiked ? "block" : "none";
      }

      const postLikeIcon = document.querySelector(".post-actions .ri-heart-3-line");

      function togglePostLike() {
        const isLiked = postLikeIcon.classList.contains("ri-heart-3-fill");

        if (isLiked) {
          postLikeIcon.classList.remove("ri-heart-3-fill");
          postLikeIcon.classList.add("ri-heart-3-line");
          postLikeIcon.style.color = "initial"; 
        } else {
          postLikeIcon.classList.remove("ri-heart-3-line");
          postLikeIcon.classList.add("ri-heart-3-fill");
          postLikeIcon.style.color = "red";
        }
      }
      
      storiesContainer.addEventListener("click", (event) => {
        const storyElement = event.target.closest(".story");
        if (storyElement) {
          const index = storyElement.dataset.index;
          showStory(index);
        }
      });

      likeIcon.addEventListener("click", toggleLike);
      likedIcon.addEventListener("click", toggleLike);
      postLikeIcon.addEventListener("click", togglePostLike);

    })();