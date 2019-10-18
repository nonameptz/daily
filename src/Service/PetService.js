const PetService = {
  getGlobalUrl: () => {
    // return '';
    //TODO do it only for localhost
    return "https://daily-pet.ru/";
  },

  getImageUrl: animal => {
    let utc = new Date().getTime();
    // 00:00 in PST timezone - is a time for new animal (it's UTC-7)
    let pst = new Date(utc - 3600000 * 7).toJSON();
    let date = pst.slice(0, 10);

    return PetService.getGlobalUrl() + "/gifs/" + animal + "/" + date + ".gif";
  },

  getNoImageUrl: animal => {
    return PetService.getGlobalUrl() + "/gifs/" + animal + "/_not_found.gif";
  },

  getContextData: animal => {
    let tgUrl = "tg://resolve?domain=daily_dog";
    let title = "Dog 🐶";
    if (animal === "cats") {
      tgUrl = "tg://resolve?domain=daily_cat_gif";
      title = "Cat 🐱";
    }
    return {
      tgUrl,
      title
    };
  }
};

export default PetService;
