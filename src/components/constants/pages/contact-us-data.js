const ContactUsData = () => {
  return {
    seoData: {
      title: `Contact Us`,
      description: `We're a top quality bedding products retailer aiming to provide you with premium sleeping experience with our wide array of mattresses. Feel free to contact us!`,
      ogPath: '/contact-us/',
    },
    mainData: {
      pageTitle: `Contact Us`,
      infoBlocks: [
        {
          icon: `gs-phone`,
          title: `Call Us Now`,
          content: `<a href='tel:905-212-7722'>905-212-7722</a>`,
        },
        {
          icon: `gs-map-pin`,
          title: `Visit Mattressville`,
          content: `<p>1911 Dundas St. East, Unit 18<br/>Mississauga, On L4X 1M1</p>`,
        },
        {
          icon: `gs-clock`,
          title: `Working hours`,
          content: `<p>Monday to Friday:11am to 7pm <br/>Saturday:11am to 6pm <br/>Sunday:12pm to 5pm</p>`,
        },
      ],
    },
  }
}

export default ContactUsData
