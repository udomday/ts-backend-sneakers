class userController {
  async registration(req: any, res: any) {
    try {
      const {mail, password} = req.body;

      
    } catch (e) {
      console.log(e);
    }
  }
}

export default new userController();
