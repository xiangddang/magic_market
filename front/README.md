# Magic Market

## Introduction of the Project
**Group Name:** Magic Bean

**Project Name:** Magic Market

**Project Discription:** 
We are developing an online student marketplace inspired by platforms like Facebook Marketplace and "Xianyu" (闲鱼). Our goal is to create a user-friendly platform where students can easily buy and sell various items.

**Key Feature:**
- User Registration and Profile Creation
- Item Listings with detailed information and images
- Search and Filters for easy item discovery
- Communication and Negotiation between buyers and sellers
- Ratings and Reviews to build trust and transparency


### Iteration 1 Progress and Problems Report

#### Overview

We have successfully implemented the foundational features of this project, establishing the groundwork for a dynamic secondary market. While the core functionality is in place, we acknowledge the need for additional refinements to elevate the user experience. Our database is now populated with simulated data, ensuring smooth operations. Users can navigate the interface to explore available products and list items for sale.

#### Team Members and Contributions:

**Xin Fang**: 
I am accountable for establishing the fundamental framework of the entire project and addressing minor intricacies within both front-end and back-end components. My primary focus centers on optimizing the homepage and refining user-centric sections within the front-end.

**Yutong Geng**: 
My primary responsibilities encompass meticulous web UI design and development, spanning both front-end and back-end domains. On the front-end, my dedication lies in enhancing the visual appeal and functionality of pages. Simultaneously, I contribute to the back-end by implementing and debugging specific features to ensure optimal user interactions with the interface.

**Yanying Xiang**: 
I am primarily entrusted with comprehensive web functional design, mock data implementation, and deploying into MongoDB Atlas and Google App Engine. My efforts within the back-end and web pages revolve around elevating the product presentation section, ensuring accurate data representation. Additionally, I manage various other functionalities to ensure seamless coordination of the entire system across diverse aspects.


#### Progress Achieved:
- The main homepage is now navigable to the "buy" and "sell" pages.
- The "buy" page displays all available products, each with its own detailed page.
- On the "sell" page, users can view their own listed items for sale and add new items to sell.
- Within the user interface, users have the ability to modify their profiles and also view a collection of their favorited items.

#### Challenges Encountered:

Integration Delays: Designing the UI for the website can indeed be challenging, even with the assistance of third-party libraries. It often involves a delicate balance between aesthetics, functionality, and user experience. While libraries can provide pre-built components and styles, tailoring them to fit your specific design vision and ensuring a seamless user interaction can still be a demanding task. It's important to iterate, gather user feedback, and continuously refine the UI to achieve the desired outcome. Remember, practice and experience will gradually make the process smoother over time.

Image Upload: We have incorporated a photo upload feature within our selling interface. While it functions properly during local testing, issues arose upon deployment to gcloud.


#### Screenshots:
![main page](/assets/iter1/mainpage.png)
![product list](/assets/iter1/productlist.png)
![product](/assets/iter1/product.png)
![sell list](/assets/iter1/selllist.png)
![new sell](/assets/iter1/newsell.png)
![add new sell](/assets/iter1/addnewsell.png)
![main profile](/assets/iter1/mainprofile.png)
![edit profile](/assets/iter1/editprofile.png)
![favorites](/assets/iter1/favorites.png)

#### Next Steps:

- Interactive Communication Feature enables buyers to engage in discussions with sellers regarding their preferred products, facilitating successful transactions.
- Further Enhance User Interface (UI) for a more polished and user-friendly experience.
- Further Refine Product and User Information for a more detailed and personalized experience.



### Iteration 2 Progress and Problems Report

#### Overview

The current webpage has now almost implemented all of the functionalities. In this iteration, we have built upon the previous version by adding image upload functionality. User-uploaded images are stored in Google Cloud. Additionally, we have successfully implemented real-time communication features. Users can now send messages to sellers of products they are interested in, and all users can view messages in a dedicated messaging interface.

#### Team Members and Contributions:

**Xin Fang**: 

I am accountable for establishing the fundamental framework of the entire project and addressing minor intricacies within both front-end and back-end components. My primary focus centers on optimizing the homepage and refining user-centric sections within the front-end.

I have implemented the image uploading functionality, utilizing Google Cloud for storage. Additionally, I have also successfully integrated real-time communication capabilities, allowing buyers and sellers to engage in instant conversations.

**Yutong Geng**: 

My primary responsibilities encompass meticulous web UI design and development, spanning both front-end and back-end domains. On the front-end, my dedication lies in enhancing the visual appeal and functionality of pages. Simultaneously, I contribute to the back-end by implementing and debugging specific features to ensure optimal user interactions with the interface.

I have created a messaging interface that presents messages in a natural and visually pleasing manner, organizing them based on user interactions. I have also adjusted the primary color scheme across all interfaces to better align with the "magic" theme. Additionally, I've optimized and deployed all interfaces to enhance the overall visual appeal.

**Yanying Xiang**: 
I am primarily entrusted with comprehensive web functional design, mock data implementation, and deploying into MongoDB Atlas and Google App Engine. My efforts within the back-end and web pages revolve around elevating the product presentation section, ensuring accurate data representation. Additionally, I manage various other functionalities to ensure seamless coordination of the entire system across diverse aspects.


I approached the project from a user's perspective and improved various aspects. For instance, I enhanced the backend to allow users to filter products displayed on the main interface by clicking on categories, conditions, and prices. I updated the search functionality to filter products based on their titles. I also added the ability for users to modify the status of their products that are currently for sale. Additionally, I introduced features like a footer and made style adjustments to enhance the overall user experience.

#### Progress Achieved:
- Filter products by categories, conditions and price.
- Search products by titles.
- Real-time communication capabilities for seller and buyer.
- Website style improved.
- Many details have been further refined and improved.


#### Challenges Encountered:

- Real-time communication functionality and style.

#### Screenshots:
![main page](/assets/iter2/mainpage.png)
![product list](/assets/iter2/productlist.png)
![product](/assets/iter2/product.png)
![product message](/assets/iter2/productmessage.png)
![sell list](/assets/iter2/selllist.png)
![new sell](/assets/iter2/newsell.png)
![add new sell](/assets/iter2/addnewsell.png)
![chat](/assets/iter2/chat.png)
![profile](/assets/iter2/profile.png)
![edit profile](/assets/iter2/edit%20profile.png)
![favorites](/assets/iter2/favorites.png)


#### Next Steps:

- Enhanced additional details to elevate the user experience.


### Iteration 3 Progress and Problems Report

#### Overview

Building upon the previous iteration, we have made enhancements by adding features such as pop-up dialogs and product editing. We have also improved the process of selling products and made adjustments to the user interface for managing products on sale. As a result, the website now functions as a platform for users to engage in second-hand transactions.

#### Team Members and Contributions:

**Xin Fang**: 

I am accountable for establishing the fundamental framework of the entire project and addressing minor intricacies within both front-end and back-end components. My primary focus centers on optimizing the homepage and refining user-centric sections within the front-end.

I have implemented the image uploading functionality, utilizing Google Cloud for storage. Additionally, I have also successfully integrated real-time communication capabilities, allowing buyers and sellers to engage in instant conversations.

I've organized the previous code by splitting certain functionalities into new components that can function independently. This approach has led to a more concise and maintainable overall codebase, which will be beneficial for future updates.

**Yutong Geng**: 

My primary responsibilities encompass meticulous web UI design and development, spanning both front-end and back-end domains. On the front-end, my dedication lies in enhancing the visual appeal and functionality of pages. Simultaneously, I contribute to the back-end by implementing and debugging specific features to ensure optimal user interactions with the interface.

I have created a messaging interface that presents messages in a natural and visually pleasing manner, organizing them based on user interactions. I have also adjusted the primary color scheme across all interfaces to better align with the "magic" theme. Additionally, I've optimized and deployed all interfaces to enhance the overall visual appeal.

I've made adjustments to the styling of the user's selling page and the favorites page, giving each of them a distinct visual identity. I've also fixed the bug in the carousel and refined the product display interface. Furthermore, I've optimized the avatars of senders and recipients in the chat interface, taking the overall website UI to the next level.

**Yanying Xiang**: 
I am primarily entrusted with comprehensive web functional design, mock data implementation, and deploying into MongoDB Atlas and Google App Engine. My efforts within the back-end and web pages revolve around elevating the product presentation section, ensuring accurate data representation. Additionally, I manage various other functionalities to ensure seamless coordination of the entire system across diverse aspects.

I approached the project from a user's perspective and improved various aspects. For instance, I enhanced the backend to allow users to filter products displayed on the main interface by clicking on categories, conditions, and prices. I updated the search functionality to filter products based on their titles. I also added the ability for users to modify the status of their products that are currently for sale. Additionally, I introduced features like a footer and made style adjustments to enhance the overall user experience.

I've made initial adjustments to the user's selling page, refined the styling of the product display page, and added the ability to list items for sale. I've also taken responsibility for deploying the project, writing the README, and uploading information to Piazza.

#### Progress Achieved:
- Improved overall website UI
- Added pop-ups, product editing, and improved selling functionality
- Improved the 'sold' function
- Created modular components for better code organization.
- Fixed carousel issues and adjusted product display.
- Improved avatars in the chat interface.
- Refined user selling interface.


#### Screenshots:
![](/assets/iter3/mainpage.png)
![](/assets/iter3/buypage.png)
![](/assets/iter3/buyitempage.png)
![](/assets/iter3/selllist.png)
![](/assets/iter3/sellproduct.png)
![](/assets/iter3/editproduct.png)
![](/assets/iter3/blanksell.png)
![](/assets/iter3/addproduct.png)
![](/assets/iter3/chat.png)
![](/assets/iter3/profile.png)
![](/assets/iter3/editprofile.png)
![](/assets/iter3/favorites.png)


