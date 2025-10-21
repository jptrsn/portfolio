import { skillsData } from "@/data/skills";
import { SkillNode } from "@/types/types";

export const getSkillsData = (): SkillNode[] => {
  return skillsData;
}

export const getNodeById = (id: string): SkillNode | undefined => {
  return skillsData.find(node => node.id === id);
};

// Helper function to get all connections for a node
export const getNodeConnections = (id: string): SkillNode[] => {
  const node = getNodeById(id);
  if (!node) return [];

  return node.relatedTo
    .map(relatedId => getNodeById(relatedId))
    .filter((n): n is SkillNode => n !== undefined);
};