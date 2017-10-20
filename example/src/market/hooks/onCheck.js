/**
 * Hook for picking up check events
 * Note: You have access to all items currently in the workspace, but you must only return the item being mutated
 * Warning: a select all command will run this hook once for each item as it builds the workspaceItems list
 */
export default ({item,workspaceItems})=>item