import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoots";

export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootsIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootsIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootsIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
