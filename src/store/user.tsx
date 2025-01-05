import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMediaDetails } from "@/types/movie";

export interface HistoryItem {
  id: number;
  mediaType: "movie" | "tv";
  watchedOnServerId: string;
  episodeNumber?: number;
  seasonNumber?: number;
  watchedAt: string;
  progress: number;
  mediaDetails: IMediaDetails;
}

interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  history: HistoryItem[];
  watchlist: IMediaDetails[];
  preferences: {
    preferredServer: string;
    themeColor: string;
  };
}

interface UserState {
  profiles: Profile[];
  activeProfileId: string | null;
  addProfile: (name: string) => void;
  deleteProfile: (id: string) => void;
  setActiveProfile: (id: string) => void;
  getActiveProfile: () => Profile | null;
  addOrUpdateToHistory: (historyItem: Omit<HistoryItem, "watchedAt">) => void;
  removeFromHistory: (id: number) => void;
  addToWatchlist: (media: IMediaDetails) => void;
  removeFromWatchlist: (mediaId: number) => void;
  updatePreferences: (preferences: Partial<Profile["preferences"]>) => void;
  isInWatchlist: (mediaId: number) => boolean;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,
      activeProfile: null,
      addProfile: (name: string) => {
        const { profiles } = get();
        const newProfile: Profile = {
          id: crypto.randomUUID(),
          name,
          imageUrl: `https://xsgames.co/randomusers/assets/avatars/pixel/${
            profiles.length + 1
          }.jpg`,
          history: [],
          watchlist: [],
          preferences: {
            preferredServer: "server1",
            themeColor: "#000000",
          },
        };
        set((state) => ({
          profiles: [...state.profiles, newProfile],
        }));
      },

      deleteProfile: (id: string) => {
        set((state) => ({
          profiles: state.profiles.filter((profile) => profile.id !== id),
          activeProfileId:
            state.activeProfileId === id ? null : state.activeProfileId,
        }));
      },

      setActiveProfile: (id: string) => {
        set({ activeProfileId: id });
      },
      getActiveProfile: () => {
        const { activeProfileId } = get();
        return (
          get().profiles.find((profile) => profile.id === activeProfileId) ||
          null
        );
      },
      updateHistory: (id: number, historyItem: HistoryItem) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;
        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (profile.id === activeProfileId) {
              return {
                ...profile,
                history: profile.history.map((item) =>
                  item.id === id ? historyItem : item
                ),
              };
            }
            return profile;
          }),
        }));
      },

      addOrUpdateToHistory: (historyItem: Omit<HistoryItem, "watchedAt">) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (profile.id === activeProfileId) {
              const newHistoryItem: HistoryItem = {
                ...historyItem,
                watchedAt: new Date().toISOString(),
              };
              if (
                profile.history.some((item) => item.id === newHistoryItem.id)
              ) {
                profile.history = profile.history.map((item) =>
                  item.id === newHistoryItem.id ? newHistoryItem : item
                );
              } else {
                profile.history.push(newHistoryItem);
              }
            }
            return profile;
          }),
        }));
      },

      removeFromHistory: (id: number) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (profile.id === activeProfileId) {
              return {
                ...profile,
                history: profile.history.filter((item) => item.id !== id),
              };
            }
            return profile;
          }),
        }));
      },

      addToWatchlist: (media: IMediaDetails) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (
              profile.id === activeProfileId &&
              !profile.watchlist.some((item) => item.id === media.id)
            ) {
              return { ...profile, watchlist: [...profile.watchlist, media] };
            }
            return profile;
          }),
        }));
      },

      removeFromWatchlist: (mediaId: number) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (profile.id === activeProfileId) {
              return {
                ...profile,
                watchlist: profile.watchlist.filter(
                  (item) => item.id !== mediaId
                ),
              };
            }
            return profile;
          }),
        }));
      },

      updatePreferences: (preferences) => {
        const { activeProfileId } = get();
        if (!activeProfileId) return;

        set((state) => ({
          profiles: state.profiles.map((profile) => {
            if (profile.id === activeProfileId) {
              return {
                ...profile,
                preferences: { ...profile.preferences, ...preferences },
              };
            }
            return profile;
          }),
        }));
      },

      isInWatchlist: (mediaId: number) => {
        const { profiles, activeProfileId } = get();
        if (!activeProfileId) return false;

        const activeProfile = profiles.find(
          (profile) => profile.id === activeProfileId
        );
        return (
          activeProfile?.watchlist.some((item) => item.id === mediaId) || false
        );
      },
    }),
    {
      name: "user-profiles-storage",
    }
  )
);

export default useUserStore;
