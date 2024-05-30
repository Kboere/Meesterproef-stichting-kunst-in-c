 document.addEventListener('DOMContentLoaded', function() {
      let circularCursor = document.getElementById('circularcursor') 
      let virtualContainers = document.querySelectorAll('.mouse-element') 
      let mouseX = 0, mouseY = 0 
      let cursorX = 0, cursorY = 0 

      document.addEventListener('mousemove', function(e) {
        mouseX = e.pageX 
        mouseY = e.pageY 

        // Check if the cursor is over any virtual_container
        let isOverContainer = false 
        virtualContainers.forEach(function(container) {
          let rect = container.getBoundingClientRect() 
          if (e.clientX >= rect.left && e.clientX <= rect.right &&
              e.clientY >= rect.top && e.clientY <= rect.bottom) {
            isOverContainer = true 
          }
        }) 

        if (isOverContainer) {
          circularCursor.classList.add("active");
          // circularCursor.style.borderColor = 'white' 
        } else {
          circularCursor.classList.remove("active");
        }
      }) 

      function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1 
        cursorY += (mouseY - cursorY) * 0.1 

        if (circularCursor) {
          circularCursor.style.left = cursorX + 'px' 
          circularCursor.style.top = cursorY + 'px' 
        }

        requestAnimationFrame(animateCursor) 
      }

      animateCursor() 
    }) 