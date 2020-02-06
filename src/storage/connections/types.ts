export interface ConnectorConstructor<PathStructure> {
  pathStructure: PathStructure;
  signRequests?: boolean;
}