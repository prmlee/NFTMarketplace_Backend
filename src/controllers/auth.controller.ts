import { Body, JsonController, Post } from "routing-controllers";
import Web3 from "web3";
import { UserService } from "../services/user.service";
import { AuthParam } from "../dtos/auth/auth.dto";
import { AuthUtil } from "../utils/auth.util";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

@JsonController("/auth")
export class AuthController {
  @Post("/")
  async authenticate(@Body() authReq: AuthParam) {
    try {
      const { wallet, token, signature } = authReq;
      const account = web3.utils.toChecksumAddress(wallet);
      const signedMessage = `IGI one-time key: ${token}`;
      const recoverAddress = web3.eth.accounts.recover(signedMessage, signature);

      if (account !== recoverAddress) return { error: "Wallet and Signed Message Not Matched" };
      let user = await UserService.findByWallet(wallet);
      if (!user) user = await UserService.create(account);
      const jwtoken = await AuthUtil.createToken(user.id);
      return { data: { jwtoken, user } };
    } catch (error) {
      console.log(error);
      return { error: "Internal Server Error" };
    }
  }
}
