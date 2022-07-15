import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/user.entity";

const findById = async (id: string): Promise<User | null> => {
  return await AppDataSource.getRepository(User).findOne({ where: { id } });
};

const findByWallet = async (wallet: string): Promise<User | null> => {
  return await AppDataSource.getRepository(User).findOne({ where: { wallet } });
};

const create = async (wallet: string): Promise<User> => {
  let user = new User();
  user.username = `unknown#${new Date().getTime()}`;
  user.wallet = wallet;
  return await AppDataSource.manager.save(user);
};

export const UserService = { findById, findByWallet, create };
