import { BeCraftHTMLRenderer, type ContentNode } from '@becraft/sdk';

type ArticleContentProps = {
  nodes: ContentNode[];
};

export const ArticleContent = ({ nodes }: ArticleContentProps) => {
  return <BeCraftHTMLRenderer nodes={nodes} />;
};
