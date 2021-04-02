import { IFolder, IProcessConfiguration, IProjectDescription } from "common";


export interface ApplicationState {
  desktop: DesktopState | null;
}

export interface DesktopState {
  theme: string;
  workspaces: WorkspaceState[];
}

export interface WorkspaceState {
  name: string;
  type: string;
  root: IFolder | null;
  folder: IFolder | null;
  projects: ProjectState[];
}

export interface FolderState {
  folder: IFolder | null;
}

export interface ProjectState {
  name: string;
  explorer: ExplorerState;
  folder: IFolder | null;
  projectDescription: IProjectDescription | null;
}

export interface ProcessState {
  processConfiguration: IProcessConfiguration | null;
}

export interface ExplorerState {
  width: number;
}

export enum WorkspaceType {
  LOCAL,
  DISTRIBUTION
}

export interface ContentState {
  view: ViewState[];
}

export interface SectionState {
  id: string;
  title: string;
  icon: string; 
  isActive: boolean;
}

export interface ViewState {
  id: number;
  title: string;
  component: string;
  isActive: boolean;
  widgetName: string;
  parameters: Parameter[];
}

export interface TabState {
  id: number;
  title: string;
  active: boolean;
  disabled?: boolean;
}

export interface TabsComponentState {
  tabs: TabState[];
  shadow: boolean;
  editable: boolean;
  splitter: number;
  darkMode: boolean;
}

export interface DetailState {
  detail: Size;
}

export interface Size {
  width: number;
  height: number;
}

export interface Parameter {
  name: string;
  value: string;
}

export interface Handler {
  title: string;
  attributes: Parameter[];
}

export interface FileState {
  name: string;
  path: string;
}